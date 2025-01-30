"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets } from "@/utils/my_schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db_config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateBudget({ onBudgetCreated }) {
    const [emojiIcon, setEmojiIcon] = useState("🛍️");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useUser();
    const emojiPickerRef = useRef(null);
    const dialogRef = useRef(null);

    const resetForm = useCallback(() => {
        setName("");
        setAmount("");
        setEmojiIcon("🛍️");
        setErrorMessage("");
    }, []);

    const getNextAvailableId = useCallback(async () => {
        const existingIds = await db
            .select({ id: Budgets.id })
            .from(Budgets)
            .orderBy(Budgets.id);

        for (let i = 1; i <= existingIds.length + 1; i++) {
            if (!existingIds.some((record) => record.id === i)) {
                return i;
            }
        }
    }, []);

    const onCreateBudget = useCallback(async () => {
        setIsSubmitting(true);
        try {
            console.log("Creating budget with:", { name, amount, emojiIcon });
            if (!name || !amount || parseFloat(amount) <= 0) {
                setErrorMessage("Invalid input values");
                return;
            }

            const nextId = await getNextAvailableId();
            const result = await db.insert(Budgets).values({
                id: nextId,
                budget_name: name,
                icon: emojiIcon,
                amount: parseFloat(amount),
                email: user?.primaryEmailAddress?.emailAddress,
                total_spend: 0,
                total_items: 0
            });

            if (result) {
                toast.success("Budget created successfully!", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                resetForm();
                setIsDialogOpen(false);
                if (onBudgetCreated) {
                    onBudgetCreated();
                }
            }
        } catch (error) {
            console.error("Error creating budget:", error);
            if (error.message.includes("duplicate key value")) {
                toast.error("A budget with this email already exists.", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error("Failed to create budget. Please try again.", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            resetForm();
        } finally {
            setIsSubmitting(false);
        }
    }, [name, amount, emojiIcon, user, getNextAvailableId, resetForm, onBudgetCreated]);

    useEffect(() => {
        const handleResize = () => {
            setOpenEmojiPicker(false);
            setWindowWidth(window.innerWidth);
            // setIsDialogOpen(false);
        };

        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    useEffect(() => {
        if (isDialogOpen) {
            setOpenEmojiPicker(false);
        }
    }, [isDialogOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setOpenEmojiPicker(false);
            }
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                setIsDialogOpen(false);
                resetForm();
            }
        };

        const handleKeyPress = (event) => {
            if (event.key === "Enter" && isDialogOpen) {
                event.preventDefault();
                onCreateBudget();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [isDialogOpen, resetForm, onCreateBudget]);

    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <div className="bg-slate-200 p-4 sm:p-5 w-full max-w-[80%] sm:max-w-[40%] md:max-w-[40%] lg:max-w-[20%] xl:max-w-[20%] rounded-md flex flex-col items-center border-2 border-dashed border-gray-600 cursor-pointer hover:shadow-lg transition-transform duration-300 transform hover:scale-105 mx-auto sm:mx-0 sm:ml-4">
                        <div className="text-3xl md:text-4xl text-gray-700">+</div>
                        <div className="text-gray-600 mt-2 text-center">Create New Budget</div>
                    </div>
                </DialogTrigger>
                <DialogContent ref={dialogRef} 
                    className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-md mx-auto p-6 md:p-8 lg:p-10"
                    onInteractOutside={(e) => {
                        const validTargets = ['INPUT', 'TEXTAREA', 'BUTTON', 'DIV'];
                        if (!validTargets.includes(e.target.tagName)) {
                            resetForm();
                            setIsDialogOpen(false);
                        }
                    }}
                    onEscapeKeyDown={() => setIsDialogOpen(false)}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold text-gray-800">
                            Create New Budget
                        </DialogTitle>
                        <DialogDescription>
                            <div className="mt-5">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg mb-4 emoji-button"
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                >
                                    {emojiIcon}
                                </Button>
                                {openEmojiPicker && (
                                    <div 
                                        ref={emojiPickerRef}
                                        className="absolute top-[20%] left-1/2 transform -translate-x-1/2 z-10 rounded-md border-2 border-black"
                                    >
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji);
                                                setOpenEmojiPicker(false);
                                            }}
                                            width={windowWidth > 500 ? 350 : 250}
                                        />
                                    </div>
                                )}

                                <div className="mt-4">
                                    <label className="text-gray-900 font-medium my-1 block text-left">
                                        Budget Name
                                    </label>
                                    <Input
                                        placeholder="e.g. Shopping"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="text-black border-2 border-gray-500 rounded-md p-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="text-gray-900 font-medium my-1 block text-left">
                                        Budget Amount (Rs.)
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 3500"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="text-black border-2 border-gray-500 rounded-md p-2"
                                    />
                                </div>
                                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                                <Button
                                    disabled={isSubmitting || !(name && amount && parseFloat(amount) > 0)}
                                    onClick={onCreateBudget}
                                    className="mt-5 w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                                >
                                    {isSubmitting ? "Creating..." : "Create Budget"}
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <style jsx global>{`
                .label-align {
                    text-align: left;
                }
                @media (max-width: 640px) {
                    .label-align {
                        text-align: left;
                    }
                }
                .Toastify__toast-container {
                    width: 100%;
                    max-width: 500px;
                }
                @media (max-width: 500px) {
                    .Toastify__toast-container {
                        width: 70%;
                        max-width: 400px;
                        right: 1;
                        left: auto;
                    }
                }
                .emoji-button {
                    border: 1px solid black
                }
                .emoji-button:hover {
                    border-color: black
                }
            `}</style>
        </div>
    );
}

export default CreateBudget;
