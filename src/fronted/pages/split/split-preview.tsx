import {cn} from "@/fronted/lib/utils";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/fronted/components/ui/table";
import React from "react";
import {Button} from "@/fronted/components/ui/button";
import useSplit from "@/fronted/hooks/useSplit";

const SplitPreview = ({className}: {
    className?: string;
}) => {
    const lines = useSplit(s=>s.parseResult);
    return (
        <Table className={cn('w-full', className)}>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-20">开始时间</TableHead>
                    <TableHead className={'w-20'}>结束时间</TableHead>
                    <TableHead className={'w-60'}>标题</TableHead>
                    <TableHead className={'w-20'}>操作</TableHead>
                    {/* <TableHead className="text-right">Amount</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody
                className={'scrollbar-none'}
            >
                {lines.map((line, idx) => {
                    return (
                        <TableRow>
                            <TableCell
                                className={cn(
                                    !line.timestampStart.valid && 'text-red-500',
                                    !line.timestampValid && 'bg-red-100'
                                )}
                            >{line.timestampStart.value}</TableCell>
                            <TableCell
                                className={cn(
                                    !line.timestampStart.valid && 'text-red-500',
                                    !line.timestampValid && 'bg-red-100'
                                )}>{line.timestampEnd.value}</TableCell>
                            <TableCell className={' w-20'}>{line.title}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={async () => {
                                        // await api.call('split-video/split',{p});
                                    }}
                                >分割</Button></TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

SplitPreview.defaultProps = {
    className: ''
}

export default SplitPreview;
