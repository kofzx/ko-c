export const getVideoPosterUrl = (url: string) => {
    return new Promise(resolve => {
        let dataURL = '';
        let video = document.createElement('video');
        video.setAttribute('crossOrigin', 'anonymous');
        video.setAttribute('src', url);
        video.currentTime = 1;
        video.addEventListener('loadeddata', function() {
            let canvas: HTMLCanvasElement = document.createElement('canvas');
            let width = this.videoWidth,
                height = this.videoHeight;

            canvas.width = width;
            canvas.height = height;
            // @ts-ignore
            canvas.getContext('2d').drawImage(video, 0, 0, width, height);
            dataURL = canvas.toDataURL('image/jpeg');
            resolve(dataURL);
        });
    })
}