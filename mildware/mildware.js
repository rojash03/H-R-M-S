export function profileMiddLeWare(req, res, next) {
    console.log("Profile middleware is running");
    next();
}