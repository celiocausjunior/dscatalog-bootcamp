import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FormState } from './'

type Props = {
    control: Control<FormState>
}
const DescriptionField = ({ control }: Props) => {
    return (
        <Controller
            name="description"
            control={control}
            render={({ value, onChange }) => (
                <Editor
                    toolbarClassName="toolbar-container"
                    editorClassName="editor-container"
                    editorState={value}
                    onEditorStateChange={onChange}
                />
            )}
        />
    );
}

export default DescriptionField;