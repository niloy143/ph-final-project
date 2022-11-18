import { useEffect, useState } from "react"

const useAdmin = uid => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        if (uid) {
            fetch(`http://localhost:1234/user/${uid}`)
                .then(res => res.json())
                .then(({ isAdmin }) => {
                    setIsAdmin(isAdmin);
                    setAdminLoading(false);
                })
        }
    }, [uid])

    return [isAdmin, adminLoading];
}

export default useAdmin;