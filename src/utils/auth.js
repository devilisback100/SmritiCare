var BASE_URL = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "")

export function getUser() {
    try {
        var raw = localStorage.getItem("user")
        if (!raw) return {}
        return JSON.parse(raw)
    } catch (e) {
        return {}
    }
}

export function getToken() {
    return localStorage.getItem("access_token") || null
}

export function isLoggedIn() {
    var token = getToken()
    var user = getUser()
    if (!token) return false
    if (!user) return false
    return !!(user.id || user.user_id)
}

export function logout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
    window.location.href = "/login"
}

export async function authFetch(url, options) {
    var opts = options || {}
    var token = getToken()

    var res = await fetch(url, {
        ...opts,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            ...(opts.headers || {}),
        },
    })

    if (res.status === 401) {
        var refreshed = await tryRefreshToken()
        if (!refreshed) {
            logout()
            return null
        }
        var newToken = getToken()
        return fetch(url, {
            ...opts,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + newToken,
                ...(opts.headers || {}),
            },
        })
    }

    return res
}

async function tryRefreshToken() {
    var refreshToken = localStorage.getItem("refresh_token")
    if (!refreshToken) return false
    try {
        var res = await fetch(BASE_URL + "/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
        })
        if (!res.ok) return false
        var data = await res.json()
        localStorage.setItem("access_token", data.access_token)
        if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token)
        return true
    } catch (e) {
        return false
    }
}