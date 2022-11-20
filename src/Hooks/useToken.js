const { useEffect } = require("react");

const useToken = (user, setLoading) => {

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:1234/jwt`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('doctors-portal-token', data.token);
                    setLoading(false);
                })
        }
    }, [user, setLoading])
}

export default useToken;