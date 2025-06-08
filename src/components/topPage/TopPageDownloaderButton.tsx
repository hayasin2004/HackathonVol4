import type { TopPageCopyButtonProps } from "@/interfaces";
import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import type { FC } from "react";



export const MarkdownDownloaderButton: FC<TopPageCopyButtonProps> = ( { copytext } )=> {
    if (!copytext) return null;

    const handleDownload = () => {
        const blob = new Blob([copytext], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'summary.md'
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Button
            variant="outlined"
            fullWidth
            onClick={handleDownload}
            endIcon={<Download />}
        >
            ダウンロード
        </Button>
    )
}