import React, {useEffect, useCallback} from "react";
import Editor from "./Editor";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initialize } from "../../modules/write";

const EditorContainer = () => {
    const dispatch = useDispatch();
    const {title, body, level} = useSelector(({write}) => ({
        title: write.title,
        body: write.body,
        level: write.level
    }));
    const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
        dispatch,
    ]);

    useEffect(() => {
        return () => {
            dispatch(initialize());
        };
    }, [dispatch]);
    return <Editor onChangeField={onChangeField} title={title} body={body} level={level} />;
}

export default EditorContainer;