import React, { useRef, useEffect, useState } from "react";
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const EditorBlock = styled(Responsive)`
    padding-top: 30px;

    `;

const TitleInput = styled.input`
    font-size: 20px;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom 2rem;
    width: 100%;
    `;

const QuillWrapper = styled.div`
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

const Editor = ({ title, body, level, onChangeField }) => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);
    // const [extitle, setExtitle] = useState("");
    // const [exbody, setExbody] = useState("");
    // const [exlevel, setExlevel] = useState("");

    useEffect(()=>{
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '내용을 작성하세요...',
            modules: {
                toolbar: [
                    [{header: '1'}, {header: '2'} ],
                    ['bold','italic', 'underlin', 'strike' ],
                    [{list:' ordered'}, {list: 'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });

        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if(source==='user') {
                onChangeField({key: 'body', value : quill.root.innerHTML.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "")});
            }
        });
    }, [onChangeField]);

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
                <FormControl fullWidth>
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
                <div ref={quillElement} />
            </QuillWrapper>
        </EditorBlock>
    );
};

export default Editor;