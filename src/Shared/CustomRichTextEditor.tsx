import React from 'react'
import RichTextEditor, { EditorValue } from 'react-rte';


type GroupName =
    | "INLINE_STYLE_BUTTONS"
    | "BLOCK_TYPE_BUTTONS"
    | "LINK_BUTTONS"
    | "BLOCK_TYPE_DROPDOWN"
    | "HISTORY_BUTTONS"
    | "IMAGE_BUTTON";

interface StyleConfig {
    label: string;
    style: string;
    className?: string;
}


type StyleConfigList = StyleConfig[];

interface ToolbarConfig {
    display: GroupName[];
    extraProps?: object;
    INLINE_STYLE_BUTTONS: StyleConfigList;
    BLOCK_TYPE_DROPDOWN: StyleConfigList;
    BLOCK_TYPE_BUTTONS: StyleConfigList;
}

const toolbarConfig: ToolbarConfig = {
// Optionally specify the groups to display (displayed in the order listed).
display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
INLINE_STYLE_BUTTONS: [
    {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'}
],
BLOCK_TYPE_DROPDOWN: [
    {label: 'Normal', style: 'unstyled'},
    {label: 'Heading Large', style: 'header-one'},
    {label: 'Heading Medium', style: 'header-two'},
    {label: 'Heading Small', style: 'header-three'}
],
BLOCK_TYPE_BUTTONS: [
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'}
]
};

interface IProps {
    value: EditorValue;
    handleChange(value: EditorValue): void;
    placeholder: string;
}

const CustomRichTextEditor:React.FC<IProps> = ({value, handleChange, placeholder}) => {
    return (
        <div>
            <RichTextEditor  value={value} 
                            onChange={handleChange} 
                            toolbarConfig={toolbarConfig}
                             
                            placeholder={placeholder}/>
        </div>
    )
}

export default CustomRichTextEditor
