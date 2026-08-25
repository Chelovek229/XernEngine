const REQUIRED_PROPS = ["x", "y", "width", "height"];

function validateObject(obj, name = "object") {
    if (!obj || typeof obj !== "object") {
        throw new TypeError(`${name} must be an object`);
    }

    for (const prop of REQUIRED_PROPS) {
        if (
            typeof obj[prop] !== "number" ||
            !Number.isFinite(obj[prop])
        ) {
            throw new TypeError(
                `${name}.${prop} must be a valid number`
            );
        }
    }

    if (obj.width < 0 || obj.height < 0) {
        throw new RangeError(
            `${name} width and height cannot be negative`
        );
    }
}


// Collision detection between two axis-aligned rectangles
export function checkCollision(objA, objB) {
    validateObject(objA, "objA");
    validateObject(objB, "objB");

    return (
        objA.x < objB.x + objB.width &&
        objA.x + objA.width > objB.x &&
        objA.y < objB.y + objB.height &&
        objA.y + objA.height > objB.y
    );
}


// Collision resolution
export function resolveCollision(objA, objB, options = {}) {
    validateObject(objA, "objA");
    validateObject(objB, "objB");

    const bounce = options.bounce === true;

    if (!objA.velocity ||
        typeof objA.velocity.x !== "number" ||
        typeof objA.velocity.y !== "number") {
        throw new TypeError(
            "objA.velocity must contain x and y numbers"
        );
    }

    if (!checkCollision(objA, objB)) {
        return false;
    }


    if (bounce) {
        // Простое отражение
        objA.velocity.x *= -1;
        objA.velocity.y *= -1;
    } 
    else {
        objA.velocity.x = 0;
        objA.velocity.y = 0;
    }

    return true;
}
