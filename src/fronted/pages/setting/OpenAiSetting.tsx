import SettingInput from '@/fronted/components/setting/SettingInput';
import ItemWrapper from '@/fronted/components/setting/ItemWrapper';
import FooterWrapper from '@/fronted/components/setting/FooterWrapper';
import Header from '@/fronted/components/setting/Header';
import useSettingForm from '@/fronted/hooks/useSettingForm';
import { cn } from '@/fronted/lib/utils';
import { Button } from '@/fronted/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/fronted/components/ui/dropdown-menu';
import { EllipsisVertical, Eraser, SquarePlus } from 'lucide-react';
import * as React from 'react';

const api = window.electron;
const OpenAiSetting = () => {
    const { setting, setSettingFunc, submit, eqServer } = useSettingForm([
        'apiKeys.openAi.key',
        'apiKeys.openAi.endpoint',
        'model.gpt.default'
    ]);

    return (
        <form className="w-full h-full flex flex-col gap-4">
            <Header title="OpenAI" description="配置 OpenAI 密钥以启用转录、AI 生成等功能" />
            <ItemWrapper>
                <SettingInput
                    setValue={setSettingFunc('apiKeys.openAi.key')}
                    title="key"
                    placeHolder="sk-******************"
                    inputWidth="w-64"
                    type="password"
                    value={setting('apiKeys.openAi.key')}
                />
                <SettingInput
                    type="endpoint"
                    inputWidth="w-64"
                    placeHolder="https://api.openai.com"
                    setValue={setSettingFunc('apiKeys.openAi.endpoint')}
                    title="endpoint"
                    value={setting('apiKeys.openAi.endpoint')}
                />
                <div className={'flex justify-start items-end gap-2'}>
                    <SettingInput
                        className={cn('w-fit')}
                        type="text"
                        inputWidth="w-64"
                        placeHolder="gpt-4o"
                        setValue={setSettingFunc('model.gpt.default')}
                        title="model"
                        value={setting('model.gpt.default')}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className={'mb-1.5'} variant={'outline'} size={'icon'}>
                                <EllipsisVertical />
                            </Button></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => {
                                    setSettingFunc('model.gpt.default')('gpt-4o');
                                }}
                            >gpt-4o (recommended)</DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setSettingFunc('model.gpt.default')('gpt-3.5-turbo');
                                }}
                            >gpt-3.5-turbo</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div
                    className={cn(
                        'text-sm text-gray-500 mt-2 flex flex-row gap-2'
                    )}
                >
                    你需要配置 OpenAI 密钥以启用转录、AI 生成等功能，详见
                    <a
                        className={cn('underline')}
                        onClick={async () => {
                            await api.call('system/open-url',
                                'https://solidspoon.xyz/DashPlayer/'
                            );
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        文档
                    </a>
                </div>
            </ItemWrapper>
            <FooterWrapper>
                <Button
                    onClick={async () => {
                        await api.call('system/open-url',
                            'https://solidspoon.xyz/DashPlayer/'
                        );
                    }}
                    variant="secondary"
                >
                    查看文档
                </Button>
                <Button
                    disabled={eqServer}
                    onClick={submit}
                >
                    Apply
                </Button>
            </FooterWrapper>
        </form>
    );
};
export default OpenAiSetting;
