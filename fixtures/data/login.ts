type loginStatus = "loginOk" |"loginKo"| "loginBloqueado";

export const statusLogin: Record <loginStatus, {username: string, password: string}> = {
    loginOk: {username: "standard_user", password: "secret_sauce"},
    loginKo: {username: "standard_user", password: "contraseñaIncorrecta"},
    loginBloqueado: {username: "locked_out_user", password: "secret_sauce"}
}