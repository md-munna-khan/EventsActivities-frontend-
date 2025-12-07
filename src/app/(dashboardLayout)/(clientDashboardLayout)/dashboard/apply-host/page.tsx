"use client";

import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { applyHostAction } from "@/services/host/applyHostService";
import InputFieldError from "@/components/shared/InputFieldError";

const ApplyHostPage = () => {
  const [state, formAction, isPending] = useActionState(applyHostAction, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if (state && state.success && state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Become a Host</h1>
          <p className="text-muted-foreground mt-2">
            Apply to become a host and start creating amazing events. You will be logged out until your application is approved.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <FieldGroup>
            <div className="grid grid-cols-1 gap-4">
              {/* Bio */}
              <Field>
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="Tell us about yourself and why you want to become a host..."
                  required
                />
                <InputFieldError field="bio" state={state} />
              </Field>

              {/* Experience */}
              <Field>
                <FieldLabel htmlFor="experience">Experience</FieldLabel>
                <textarea
                  id="experience"
                  name="experience"
                  rows={3}
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="Describe your experience in organizing events..."
                  required
                />
                <InputFieldError field="experience" state={state} />
              </Field>

              {/* Specialties */}
              <Field>
                <FieldLabel htmlFor="specialties">Specialties (comma-separated)</FieldLabel>
                <Input
                  id="specialties"
                  name="specialties"
                  type="text"
                  placeholder="e.g., Music Events, Sports, Food & Dining, Technology"
                />
                <FieldDescription>
                  List your areas of expertise separated by commas
                </FieldDescription>
                <InputFieldError field="specialties" state={state} />
              </Field>

              {/* Portfolio/Website */}
              <Field>
                <FieldLabel htmlFor="portfolio">Portfolio/Website (Optional)</FieldLabel>
                <Input
                  id="portfolio"
                  name="portfolio"
                  type="url"
                  placeholder="https://your-portfolio.com"
                />
                <InputFieldError field="portfolio" state={state} />
              </Field>

              {/* Contact Number */}
              <Field>
                <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  placeholder="+8801xxxxxxxxx"
                  required
                />
                <InputFieldError field="contactNumber" state={state} />
              </Field>

              {/* Location */}
              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="City, Country"
                  required
                />
                <InputFieldError field="location" state={state} />
              </Field>
            </div>

            <FieldGroup className="mt-6">
              <Field>
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? "Submitting Application..." : "Submit Application"}
                </Button>
                <FieldDescription className="text-center mt-2">
                  After submission, you will be logged out until an admin approves your application.
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default ApplyHostPage;
