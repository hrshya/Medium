import axios from "axios";
import { AppBar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css'; // Import Quill's CSS
import '../styles/quillCustom.css';
import sanitizeHtml from 'sanitize-html';

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // Manage description as state
    const navigate = useNavigate();

    const handlePublish = async () => {
        // Sanitize HTML content before sending
        const sanitizedContent = sanitizeHtml(description, {
            allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'img', 'ul', 'li', 'ol', 'h1', 'h2', 'h3', 'video'],
            allowedAttributes: {
                'a': ['href'],
                'img': ['src', 'alt'],
                'video': ['src', 'controls']
            }
        });

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: sanitizedContent // Send sanitized content to backend
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error('Error publishing content:', error);
        }
    };

    return (
        <div>
            <AppBar />
            <div className="flex justify-center pt-8 px-10">
                <div className="max-w-screen-lg w-full relative">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="block py-2.5 text-2xl px-0 w-full text-gray-900 bg-transparent border-0 border-gray-300 font-serif focus:outline-none peer"
                        placeholder="Title"
                    />

                    <RichEditor onChange={setDescription} /> {/* Pass setDescription as a prop */}

                    <button
                        onClick={handlePublish}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 right-0 absolute mb-2"
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
};

const RichEditor: React.FC<{ onChange: (content: string) => void }> = ({ onChange }) => {
    const editorRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (editorRef.current) {
            // Initialize Quill editor
            const quill = new Quill(editorRef.current, {
                theme: 'bubble',
                modules: {
                    toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }],
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                        ['link', 'image', 'video']
                    ]
                },
                placeholder: 'Tell your Story...' // Add placeholder text here
            });

            // Handle editor changes
            quill.on('text-change', () => {
                const content = quill.root.innerHTML; // Get HTML content from the editor
                onChange(content); // Update the parent component's state
            });
        }
    }, [onChange]);

    return (
        <div className="editor-container m-[-15px]">
            <div ref={editorRef} />
        </div>
    );
};

export default RichEditor;
