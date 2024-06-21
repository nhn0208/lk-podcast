
import { useRef, useState } from 'react'
import { api } from '@/convex/_generated/api'
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { useAction, useMutation } from 'convex/react'
import { Loader } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid';

import { GenerateAudioProps } from '@/types'
import { useToast } from './ui/use-toast'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'


const GenerateAudio = (
    { setAudio, setAudioStorageId, audio, setAudioDuration}: GenerateAudioProps
) => {

    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const audioRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast()
  
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const { startUpload } = useUploadFiles(generateUploadUrl)
  
    const getAudioUrl = useMutation(api.podcasts.getUrl);

    const handleAudio = async (blob: Blob, fileName: string) => {
        setIsAudioLoading(true)
        setAudio('')

        try {
            const file = new File([blob], fileName, { type: 'audio/mpeg' })

            const uploaded = await startUpload([file])
            const storageId = (uploaded[0].response as any).storageId

            setAudioStorageId(storageId)

            const audioUrl = await getAudioUrl({ storageId })
            setAudio(audioUrl!)
            setIsAudioLoading(false)
            toast({
                title: "Audio generated successfully",
            })
        } catch (error) {
            console.log(error)
            toast({ title: 'Error generating audio', variant: 'destructive'})
            
        }
    }
  
    const generateAudio = async () => {
      try { 
        const blob = new Blob([audio], { type: 'audio/mpeg' });
        handleAudio(blob, `audio-${uuidv4()}`)
      } catch (error) {
        console.log(error)
        toast({ title: 'Error generating thumbnail', variant: 'destructive'})
      }
      
    }
    const uploadAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        try {
            const files = e.target.files
            if (!files) return;
            const file = files[0]
            const blob = await file.arrayBuffer()
            .then(( ab ) => new Blob([ab]));

            handleAudio(blob,file.name)
        } catch (error) {
            console.log(error);
            toast({ title: 'Error uploading audio', variant: 'destructive'})
        }
    }

  return (
    <div className='mb-10'>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          Upload audio file
        </Label>
        <Input 
            className='input-class text-white-1 font-mono'
            type='file'
            onChange={(e) => uploadAudio(e)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
      <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1" onClick={generateAudio}>
        {isAudioLoading ? (
          <>
            Uploading
            <Loader size={20} className="animate-spin ml-2" />
          </>
        ) : (
          'Generate'
        )}
      </Button>
      </div>
      {audio && (
        <audio 
          controls
          src={audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GenerateAudio