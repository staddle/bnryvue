export default function (doc) {
    if (doc.isBroken) {
        return '/not-found'
    }

    if (doc.type === 'blog-home') {
        return '/blog'
    }

    if (doc.type === 'blog-post') {
        return '/blog/' + doc.uid
    }

    return '/not-found'
}