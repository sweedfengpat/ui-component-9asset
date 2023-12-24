import React, { useEffect, useRef, useState} from "react";

export type MainMenuLanguage = 'th' | 'en' | 'cn' | string;

export type MenuBar = { text: string, link: string, items?: MenuBar }[];

export const AdvanceSearch = (props: any) => {
    const frameStyle = {
        width: '100%',
        // height: '100%',
        border: 'none'
    }
    
    const iframeEl = useRef(null);
    const [iframeHeight, setIframeHeight] = useState('auto');

    useEffect(() => {
        const bindEvent = (element: any, eventName: any, eventHandler: any) => {
            if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        }
        bindEvent(window, 'message', (e: any) => {
            const { target, type, value } = e.data;
            if( target !== '9assetApp') return;
            if(type === 'setheight') {
                // console.log('Header APP receive value: ', `${value}px`);
                //   frame.height = `${value}px` ; //height
                setIframeHeight(`${value}px`);
            }
        })
    }, [])
    
    return (
        <div style={{width: '100%', zIndex: 10, position: 'relative'}}>
            <iframe
                title="search-component"
                ref={iframeEl}
                src={`${ process.env.REACT_APP_DOMAIN
                    || process.env.NEXT_PUBLIC_DOMAIN
                    || 'https://my.9asset.com' }/search-component/${props.lang || 'th'}/`}
                style={frameStyle} 
                height={iframeHeight}
            />
        </div>
    )
}
