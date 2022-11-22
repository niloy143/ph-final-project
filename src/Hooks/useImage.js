import { useEffect } from "react";

const useImage = (img, setImgURL) => {
    useEffect(() => {
        if (img) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(img);
            fileReader.onload = e => {
                const { result } = e.target;
                result && setImgURL(result);
            }
        }
    }, [img, setImgURL])
}

export default useImage;