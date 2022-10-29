import { useTheme } from '@mui/styles';
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus as dark, solarizedlight as light } from 'react-syntax-highlighter/dist/esm/styles/prism'
import raw from 'rehype-raw'

export const MarkdownContent: FC<{ content: string }> = ({ content }) => {
    const theme = useTheme();
    return <ReactMarkdown
        rehypePlugins={[raw]}
        components={{
            img({ ...props }) {
                return (<img  {...props} width={'maxWidth: 100%'} />)
            },
            a({ ...props }) {
                return (<a  {...props} style={{ color: theme["palette"].info.main }} />)
            },
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                    <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={theme["palette"].mode == 'light' ? light : dark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                    />
                ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                )
            }

        }}
    >{content}</ReactMarkdown>
}
