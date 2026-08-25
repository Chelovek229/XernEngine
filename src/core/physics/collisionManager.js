// Collision Manager
export class CollisionManager {
    constructor() {
        this.objects = [];
    }

    addObject(obj) {
        if (obj === null || typeof obj !== 'object') {
            throw new TypeError(
                'CollisionManager: object must be an object'
            );
        }

        if (this.objects.includes(obj)) {
            throw new Error(
                'CollisionManager: object already exists'
            );
        }

        this.objects.push(obj);
    }

    removeObject(obj) {
        const index = this.objects.indexOf(obj);

        if (index === -1) {
            throw new Error(
                'CollisionManager: object not found'
            );
        }

        this.objects.splice(index, 1);
    }

    checkAllCollisions() {
        for (let i = 0; i < this.objects.length; i++) {
            const objA = this.objects[i];

            for (let j = i + 1; j < this.objects.length; j++) {
                const objB = this.objects[j];

                if (this.checkCollision(objA, objB)) {
                    this.onCollision(objA, objB);
                }
            }
        }
    }

    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    onCollision(a, b) {
        console.log('Collision:', a, b);
    }
}
