import React, { useRef, useEffect, useState } from "react";
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
import ImageCompress from 'quill-image-compress';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import axios from 'axios';
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const EditorBlock = styled(Responsive)`
    padding-top: 5rem;
    position:relative;
    `;

const TitleInput = styled.input`
    font-size: 20px;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
    `;

const QuillWrapper = styled.div`
    .ql-toolbar {
        margin-top: 1rem;
    }
    .ql-editor {
        padding: 0;
        min-height: 250px;
        font-size: 1.125rem;
        line-height: 1.5;
        border: 1px solid
    }
    .ql-editor.ql-blank::before {
        left: 0px;
    }
    `;

export const modules = {
    toolbar: {
        container: [
            ["link", "image", "video"],
            [{ header: [1, 2, 3, false] }],
            [{"direction": "rtl"}],
            ["bold", "italic", "underline", "strike"],
            ["blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
        ],
    },
    
    imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"]
    },
    imageCompress: {
        quality: 0.7, // default
        maxWidth: 300, // default
        maxHeight: 200, // default
        imageType: 'image/jpg', // default
        debug: true, // default
        suppressErrorLogging: false, // default
    }
    
};




const Editor = ({ title, body, level, onChangeField, thumbnail }) => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);
    
    // const [extitle, setExtitle] = useState("");
    // const [exbody, setExbody] = useState("");
    // const [exlevel, setExlevel] = useState("");

    
    const onClickImageBtn = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.addEventListener('change', async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('img', file);

            try{
                const result = await axios.post('/upload/single', formData);
                // console.log('성공시 백엔드가 보내주는 데이터', result.data.url);
                const IMG_URL = result.data.url;
                const range =  quillInstance.current.getSelection();
                quillInstance.current.insertEmbed(range.index, 'image', IMG_URL);
                quillInstance.current.setSelection(range.index + 1);
                quillInstance.current.focus();
                onChangeField({key: 'body', value: quillInstance.current.root.innerHTML});

            } catch(err) {
                console.log(err);
            }
        });
    };
    

    useEffect(()=>{
            Quill.register('modules/imageCompress', ImageCompress);
            Quill.register("modules/imageResize", ImageResize);

            quillInstance.current = new Quill(quillElement.current, {
                theme: 'snow',
                placeholder: '내용을 작성하세요...',
                modules: modules
            });
        
        const quill = quillInstance.current;

        quill.on('text-change', (delta, oldDelta, source) => {
            if(source==='user') {
                //onChangeField({key: 'body', value : quill.root.innerHTML.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "")});
                onChangeField({key: 'body', value: quill.root.innerHTML});
                console.log(quill.root.innerHTML);
                let bodyCopy = quill.root.innerHTML;
                let img=bodyCopy.split("<img ");
                let thumbnail=img[1].split(">");
                console.log(thumbnail[0]);
                onChangeField({key:'thumbnail', value:`<img ${thumbnail[0]}>`});
            }
        });

        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('image', onClickImageBtn);

    }, [onChangeField]);

    const mounted =useRef(false);
    useEffect(()=>{
        if(mounted.current) return;
        mounted.current=true;
        quillInstance.current.root.innerHTML = body;
    }, [body]);

    
    const onChangeTitle = (e) => {
        onChangeField({key:'title', value:e.target.value});
    };

    const onChangeLevel = (e) => {
        onChangeField({key:'level', value:e.target.value});
    };
    

    return (
        <EditorBlock>
            <TitleInput 
                placeholder="제목을 입력하세요" 
                onChange={onChangeTitle}
                value={title}
            />
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth >
                    <InputLabel>난이도</InputLabel>
                        <Select
                        value={level}
                        label="난이도"
                        onChange={onChangeLevel}
                        >
                            <MenuItem value={0}>초급</MenuItem>
                            <MenuItem value={1}>중급</MenuItem>
                            <MenuItem value={2}>고급</MenuItem>
                            <MenuItem value={3}>자취9단</MenuItem>
                        </Select>
                </FormControl>
            </Box>
            <QuillWrapper>
                <div ref={quillElement}></div>
            </QuillWrapper>
        </EditorBlock>
    );
};

export default Editor;