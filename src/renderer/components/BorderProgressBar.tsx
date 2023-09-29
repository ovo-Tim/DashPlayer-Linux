import ProgressBar from '@ramonak/react-progress-bar';
import { Component } from 'react';
import { visible, white } from 'chalk';
import PlayTime from './PlayTime';

interface BorderProgressBarParam {
    hasSubTitle: boolean;
    getCurrentTime: () => number;
    getTotalTime: () => number;
}

interface BorderProgressBarState {
    completed: number;
    isHover: boolean;
}

export default class BorderProgressBar extends Component<
    BorderProgressBarParam,
    BorderProgressBarState
> {
    private interval: NodeJS.Timer | undefined;

    private timeout: (number | undefined)[] = [];

    constructor(
        props: BorderProgressBarParam | Readonly<BorderProgressBarParam>
    ) {
        super(props);
        this.state = {
            completed: 100,
            isHover: false,
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.intervalTask, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    private intervalTask = (): void => {
        const { getCurrentTime, getTotalTime } = this.props;
        const currentTime = getCurrentTime();
        const totalTime = getTotalTime();
        if (currentTime === undefined || totalTime === undefined) {
            return;
        }
        this.setState({
            completed: (currentTime / totalTime) * 100,
        });
    };

    private mouseEnter = () => {
        while (this.timeout.length > 0) {
            const id = this.timeout.pop();
            window.clearTimeout(id);
        }
        const func = () => this.setState({ isHover: true });
        this.timeout.push(window.setTimeout(func, 50));
    };

    private mouseLeave = () => {
        while (this.timeout.length > 0) {
            const id = this.timeout.pop();
            window.clearTimeout(id);
        }
        const func = () => this.setState({ isHover: false });
        this.timeout.push(window.setTimeout(func, 300));
    };

    render() {
        const { completed, isHover } = this.state;
        const { getTotalTime, getCurrentTime, hasSubTitle } = this.props;
        return (
            <>
                <div className="w-full h-2 bg-stone-200" />
                <div
                    className={`w-full flex flex-col-reverse
                items-end absolute bottom-0 h-10 mt-60 pointer-events-none`}
                >
                    <div
                        className="w-full z-50 pointer-events-auto"
                        onMouseEnter={this.mouseEnter}
                        onMouseLeave={this.mouseLeave}
                    >
                        <ProgressBar
                            baseBgColor="rgb(231 229 228)"
                            completed={completed}
                            transitionDuration="0.2s"
                            isLabelVisible={false}
                            height="8px"
                            width="100%"
                            borderRadius={`${
                                hasSubTitle ? '0 8px 8px 0' : '0'
                            }`}
                        />
                    </div>
                    <div className="flex flex-row-reverse items-end justify-end">
                        <div
                            className={`w-2 h-full pointer-events-none ${
                                isHover && !hasSubTitle ? 'bg-stone-200' : ''
                            }`}
                        />
                        <div
                            className={`   pointer-events-auto rounded-tl-lg ${
                                isHover ? 'bg-stone-200' : ''
                            }`}
                            onMouseEnter={this.mouseEnter}
                            onMouseLeave={this.mouseLeave}
                        >
                            <div
                                className={` m-2 mb-1 mr-1 p-1.5 rounded flex justify-center items-center h-6 font-mono
                            ${
                                isHover
                                    ? 'bg-stone-300 shadow-inner shadow-stone-400'
                                    : ''
                            }`}
                            >
                                <PlayTime
                                    textClassName={`${
                                        isHover
                                            ? 'text-black'
                                            : 'text-transparent'
                                    }`}
                                    getProgress={getCurrentTime}
                                    getTotalTime={getTotalTime}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                visibility: isHover ? 'visible' : 'hidden',
                                width: '5px',
                                height: '5px',
                                background:
                                    'radial-gradient(circle at 0% 0%, transparent 5px, rgb(231 229 228) 0)',
                            }}
                        />
                    </div>
                    {hasSubTitle && (
                        <div
                            className={`absolute bottom-0 right-0 w-1 h-1 bg-stone-200 -translate-x-2
                        ${isHover ? '-translate-y-11' : '-translate-y-2'}`}
                        >
                            <div className="w-full h-full rounded-br-full bg-neutral-800" />
                        </div>
                    )}
                </div>
            </>
        );
    }
}
