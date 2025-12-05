"use client";

import React, { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createEventAction } from '@/services/host/hostService';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import InputFieldError from '@/components/shared/InputFieldError';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface CreateEventModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

// Event categories matching backend enum
const eventCategories = [
    { label: 'Music', value: 'MUSIC' },
    { label: 'Movie', value: 'MOVIE' },
    { label: 'Theater', value: 'THEATER' },
    { label: 'Comedy', value: 'COMEDY' },
    { label: 'Party', value: 'PARTY' },
    { label: 'Nightlife', value: 'NIGHTLIFE' },
    { label: 'Concert', value: 'CONCERT' },
    { label: 'Festival', value: 'FESTIVAL' },
    { label: 'Sports', value: 'SPORTS' },
    { label: 'Hiking', value: 'HIKING' },
    { label: 'Cycling', value: 'CYCLING' },
    { label: 'Running', value: 'RUNNING' },
    { label: 'Fitness', value: 'FITNESS' },
    { label: 'Camping', value: 'CAMPING' },
    { label: 'Outdoor', value: 'OUTDOOR' },
    { label: 'Adventure', value: 'ADVENTURE' },
    { label: 'Social', value: 'SOCIAL' },
    { label: 'Networking', value: 'NETWORKING' },
    { label: 'Meetup', value: 'MEETUP' },
    { label: 'Community', value: 'COMMUNITY' },
    { label: 'Volunteering', value: 'VOLUNTEERING' },
    { label: 'Culture', value: 'CULTURE' },
    { label: 'Religion', value: 'RELIGION' },
    { label: 'Food', value: 'FOOD' },
    { label: 'Dinner', value: 'DINNER' },
    { label: 'Cooking', value: 'COOKING' },
    { label: 'Tasting', value: 'TASTING' },
    { label: 'Cafe', value: 'CAFE' },
    { label: 'Restaurant', value: 'RESTAURANT' },
    { label: 'Tech', value: 'TECH' },
    { label: 'Workshop', value: 'WORKSHOP' },
    { label: 'Seminar', value: 'SEMINAR' },
    { label: 'Conference', value: 'CONFERENCE' },
    { label: 'Education', value: 'EDUCATION' },
    { label: 'Language', value: 'LANGUAGE' },
    { label: 'Business', value: 'BUSINESS' },
    { label: 'Finance', value: 'FINANCE' },
    { label: 'Art', value: 'ART' },
    { label: 'Craft', value: 'CRAFT' },
    { label: 'Photography', value: 'PHOTOGRAPHY' },
    { label: 'Painting', value: 'PAINTING' },
    { label: 'Writing', value: 'WRITING' },
    { label: 'Dance', value: 'DANCE' },
    { label: 'Gaming', value: 'GAMING' },
    { label: 'Esports', value: 'ESPORTS' },
    { label: 'Board Game', value: 'BOARDGAME' },
    { label: 'Card Game', value: 'CARDGAME' },
    { label: 'Online Event', value: 'ONLINE_EVENT' },
    { label: 'Travel', value: 'TRAVEL' },
    { label: 'Tour', value: 'TOUR' },
    { label: 'Road Trip', value: 'ROADTRIP' },
    { label: 'Other', value: 'OTHER' },
];

const CreateEventModal = ({ open, onOpenChange }: CreateEventModalProps) => {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(createEventAction, null);
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [category, setCategory] = useState<string>('');

    // Handle file selection and preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove selected file
    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreview(null);
    };

    // Handle form submission success
    useEffect(() => {
        if (state?.success) {
            toast.success('Event created successfully!');
            onOpenChange(false);
            router.refresh();
            // Reset form
            setPreview(null);
            setSelectedFile(null);
            setCategory('');
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onOpenChange, router]);

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            setPreview(null);
            setSelectedFile(null);
            setCategory('');
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create a new event. All fields are required.
                    </DialogDescription>
                </DialogHeader>

                <form action={formAction} className="space-y-6">
                    <FieldGroup>
                        {/* Title */}
                        <Field>
                            <FieldLabel htmlFor="title">Event Title *</FieldLabel>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="e.g., Mountain Music Adventure"
                                required
                                disabled={isPending}
                            />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        {/* Category */}
                        <Field>
                            <FieldLabel htmlFor="category">Category *</FieldLabel>
                            <Select 
                                value={category} 
                                onValueChange={setCategory}
                                required 
                                disabled={isPending}
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {eventCategories.map((cat) => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <input type="hidden" name="category" value={category} />
                            <InputFieldError field="category" state={state} />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">Description *</FieldLabel>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe your event in detail..."
                                rows={4}
                                required
                                disabled={isPending}
                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* Date and Location Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="date">Event Date *</FieldLabel>
                                <Input
                                    id="date"
                                    name="date"
                                    type="datetime-local"
                                    required
                                    disabled={isPending}
                                />
                                <InputFieldError field="date" state={state} />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="location">Location *</FieldLabel>
                                <Input
                                    id="location"
                                    name="location"
                                    type="text"
                                    placeholder="e.g., Dhaka Hill Tracts, Bangladesh"
                                    required
                                    disabled={isPending}
                                />
                                <InputFieldError field="location" state={state} />
                            </Field>
                        </div>

                        {/* Joining Fee and Capacity Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="joiningFee">Joining Fee ($) *</FieldLabel>
                                <Input
                                    id="joiningFee"
                                    name="joiningFee"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    required
                                    disabled={isPending}
                                />
                                <InputFieldError field="joiningFee" state={state} />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="capacity">Capacity *</FieldLabel>
                                <Input
                                    id="capacity"
                                    name="capacity"
                                    type="number"
                                    min="1"
                                    placeholder="e.g., 20"
                                    required
                                    disabled={isPending}
                                />
                                <InputFieldError field="capacity" state={state} />
                            </Field>
                        </div>

                        {/* Image Upload */}
                        <Field>
                            <FieldLabel htmlFor="file">Event Image</FieldLabel>
                            <div className="space-y-4">
                                {preview ? (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                        <Image
                                            src={preview}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2"
                                            onClick={handleRemoveFile}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="file"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                        <input
                                            id="file"
                                            name="file"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            disabled={isPending}
                                        />
                                    </label>
                                )}
                            </div>
                            <InputFieldError field="file" state={state} />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Creating...' : 'Create Event'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateEventModal;

