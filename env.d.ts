/// <reference types="vite/client" />

interface FunnyMomentVideo {
    type: 'video'
    date: string;
    title: string;
    description: string;
    url: string;
    thumbnail?: string;
    source?: string;
}

interface FunnyMomentImage {
    type: 'image'
    date: string;
    title: string;
    description: string;
    url: string;
    fallback?: string;
    source?: string;
}

type FunnyMoment = FunnyMomentVideo | FunnyMomentImage
