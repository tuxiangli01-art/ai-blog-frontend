import PostEditor from "@/components/PostEditor";

export default function NewPostPage() {
    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>Create New Post</h1>
            <PostEditor />
        </div>
    );
}
