import React, { forwardRef } from 'react';
import {
    AiOutlinePauseCircle,
    AiOutlinePlayCircle,
    AiOutlineTrademarkCircle,
} from 'react-icons/ai';
import SentenceT from '../lib/param/SentenceT';
import useSetting from '../hooks/useSetting';
import usePlayerController from '../hooks/usePlayerController';
import { cn } from '../../utils/Util';
import useLayout from '../hooks/useLayout';

interface SideSentenceNewParam {
    sentence: SentenceT;
    onClick: (sentence: SentenceT) => void;
    isCurrent: boolean;
    isRepeat: boolean;
}

const SideSentence = forwardRef<HTMLDivElement, SideSentenceNewParam>(
    ({ sentence, onClick, isCurrent, isRepeat }: SideSentenceNewParam, ref) => {
        const playing = usePlayerController((state) => state.playing);
        const s = [sentence.text, sentence.textZH, sentence.msTranslate].find(
            (i) => i !== undefined && i !== ''
        );
        const fontSize = useSetting((state) => state.values.get('appearance.fontSize'));
        const icon = () => {
            if (!playing) {
                return <AiOutlinePlayCircle className="w-full h-full" />;
            }
            return isRepeat ? (
                <AiOutlineTrademarkCircle className="w-full h-full" />
            ) : (
                <AiOutlinePauseCircle className="w-full h-full" />
            );
        };

        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
            <div
                className={cn(
                    'm-1.5 px-1 py-2 border-0 flex gap-1 content-start rounded-lg bg-sentenceBackground',
                    'hover:drop-shadow-lg hover:bg-sentenceHoverBackground text-subtitle drop-shadow',
                )}
                style={{
                    // zoom: showSideBar ? 0.65 : 1,
                }}
                onClick={() => {
                    onClick(sentence);
                }}
                ref={ref}
            >
                <div
                    className={cn(
                        'flex flex-col items-center justify-center text-playIcon',
                        isCurrent ? 'visible' : 'invisible',
                        fontSize === 'fontSizeSmall' ? 'w-5 h-5' : 'w-7 h-7'
                    )}
                >
                    {icon()}
                </div>

                <div className="w-full text-center">{s ?? ''}</div>
            </div>
        );
    }
);

export default SideSentence;
