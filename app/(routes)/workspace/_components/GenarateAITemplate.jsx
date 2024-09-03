import { Button } from '@/components/ui/button'
import { LayoutGrid, Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { chatSession } from '@/config/GoogleAiModel'
  

function GenarateAITemplate({setGenerateAIOutput}) {
    const [open,setopen] = useState(false)
    const [userInput,setuserInput] = useState()
    const [loading,setloading] = useState(false);
    const generateFromAi =async()=>{
        setloading(true)
        const PROMPT = "Generate the template for editor.js in JSON for "+userInput
        const result = await chatSession.sendMessage(PROMPT);
        console.log(result.response.text());
        try{
            const output = JSON.parse(result.response.text());
            console.log(output)
            setGenerateAIOutput(output);
        }
        catch(e){
            console.log(e)
            setloading(false);
        }
        
        setloading(false)
        setopen(false)
    }
  return (
    <div>
        <Button variant='outline' className='flex gap-2'
        onClick={()=>setopen(true)}>
            <LayoutGrid className='h-4 w-4'/>Generate AI templates
        </Button>

        <Dialog open={open}>
        
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Generate AI template!</DialogTitle>
                <DialogDescription>
                    <h2>What do you want to generate?</h2>
                    <Input placeholder='Ex. Project Ideas'
                    onChange={(event)=>{setuserInput(event?.target.value)}}/>
                    <div className='mt-5 flex gap-2 justify-end'>
                        <Button variant='ghost' onClick={()=>setopen(false)}>Cancel</Button>
                        <Button variant="" onClick={()=>generateFromAi()}
                            disabled={!userInput||loading}>
                                {loading?<Loader2Icon className='animate-spin'/>:'Generate'}
                        </Button>
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>


    </div>
  )
}

export default GenarateAITemplate