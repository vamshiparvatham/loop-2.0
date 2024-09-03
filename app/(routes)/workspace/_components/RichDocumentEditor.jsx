"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Table from '@editorjs/table';
import SimpleImage from 'simple-image-editorjs';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from "@editorjs/list";
import CodeTool from '@editorjs/code';
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist'
import Paragraph from '@editorjs/paragraph';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';
import { useUser } from '@clerk/nextjs';
import GenarateAITemplate from './GenarateAITemplate';

function RichDocumentEditor({params}) {

    let isFetched=false
    const {user} = useUser();
    useEffect(()=>{
        user&&InitEditor();
    },[user])

    
    const ref = useRef();  
    //console.log(user?.primaryEmailAddress?.emailAddress)
    const [DocumentOutput , setDocumentOutput] = useState([]);
    const SaveDocument=()=>{
        ref.current.save().then(async (output)=>{
            //console.log(output)
            let email = user?.primaryEmailAddress?.emailAddress
            const docRef = doc(db, 'DocumentOutput', params?.documentId);
            await updateDoc(docRef, {
            output: JSON.stringify(output),
            editedBy: email
            })
        })
    } 

    const GetDocumentOutput = ()=>{
        const unscribe = onSnapshot(doc(db, 'DocumentOutput', params?.documentId),
    (doc)=>{
        if (doc.data()?.editedBy != user?.primaryEmailAddress?.emailAddress||isFetched==false)
            doc.data().editedBy&&editor?.render(JSON.parse(doc.data()?.output)); 
          isFetched=true
    })
    }
    let editor;
    const InitEditor = ()=>{
        if(!editor?.current){
            
            editor = new EditorJS({
                onChange:(ap,event)=>{
                    SaveDocument()
                },
                onReady:()=>{
                    GetDocumentOutput()
                },
                /**
                 * Id of Element that should contain Editor instance
                 */
                holder: 'editorjs',
                tools: {
                    
                    header: Header,
                    table: Table,
                    image: SimpleImage,
                    delimiter: Delimiter,
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true,
                    },
                    alert: {
                        class: Alert,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+A',
                        config: {
                          alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
                          defaultType: 'primary',
                          messagePlaceholder: 'Enter something',
                        },
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                        config: {
                          defaultStyle: 'unordered'
                        }
                    }, 
                    list: {
                        class: NestedList,
                        inlineToolbar: true,
                        config: {
                          defaultStyle: 'unordered'
                        },
                      },
                    checklist: {
                        class: Checklist,
                        inlineToolbar: true,
                      },
                    code: {
                        class: CodeTool,
                        shortcut: 'CMD+SHIFT+P'
                    }, 
                },
            });
            ref.current = editor;
        }
        

    }
    
  return (
    <div className=''>
        <div id='editorjs' className='w-[70%]'></div>
        <div className='fixed bottom-10 md:ml-80 left-0 z-10'>
            <GenarateAITemplate setGenerateAIOutput={(output)=>editor?.render(output)}/>
        </div>
    </div>
  )
}

export default RichDocumentEditor