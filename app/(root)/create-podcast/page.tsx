"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"
import GenerateAudio from "@/components/GenerateAudio"
import GenerateThumbnail from "@/components/GenerateThumbnail"

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
})

const CreatePodcast = () => {
  const router = useRouter()

  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageUrl, setImageUrl] = useState('');
  
  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioDuration, setAudioDuration] = useState(0);
  
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPodcast = useMutation(api.podcasts.createPodcast)

  const { toast } = useToast()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  })
 
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if(!audioUrl || !imageUrl ) {
        toast({
          title: 'Please generate audio and image',
        })
        setIsSubmitting(false);
        throw new Error('Please generate audio and image')
      }

      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        imageUrl,
        views: [],
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
      })
      toast({ title: 'Podcast created' })
      setIsSubmitting(false);
      router.push('/')
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        variant: 'destructive',
      })
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
                  <FormControl>
                    <Input className="input-class focus-visible:ring-offset-orange-1" placeholder="JSM Pro Podcast" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                  <FormControl>
                    <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write a short podcast description" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex flex-col pt-10">
            <GenerateAudio 
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              audio={audioUrl}
              audioStorageId={audioStorageId}
              setAudioDuration={setAudioDuration}
            />
            <GenerateThumbnail 
              image={imageUrl}
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
            />

              <div className="mt-10 w-full">
                <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1">
                  {isSubmitting ? (
                    <>
                      Submitting
                      <Loader size={20} className="animate-spin ml-2" />
                    </>
                  ) : (
                    'Submit & Publish Podcast'
                  )}
                </Button>
              </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default CreatePodcast