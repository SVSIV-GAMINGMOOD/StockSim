"use client";

import { useState, useTransition } from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateProfile } from "../../../../actions/profiles";

const avatars = [
  "/avatars/dragonBall.jpeg",
  "/avatars/muzan.jpg",
  "/avatars/nami.jpeg",
  "/avatars/panda.jpeg",
  "/avatars/satoru.png",
  "/avatars/shinobu.jpg",
  "/avatars/zoro.jpeg",
  "/avatars/sakura.jpg",
  "/avatars/goku.jpeg",
  "/avatars/ace.png",
];

export default function EditProfileButton({
  profile,
}: {
  profile: {
    username?: string;
    avatar_url?: string;
    level?: number;
    xp?: number;
  };
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [selectedAvatar, setSelectedAvatar] = useState(
    profile.avatar_url || avatars[0]
  );

  async function handleAction(formData: FormData) {
    formData.set("avatar_url", selectedAvatar);

    startTransition(() => {
      updateProfile({
        username: formData.get("username") as string,
        avatar_url: selectedAvatar,
      }).then(() => setOpen(false));
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 shadow"
      >
        <Pencil className="w-5 h-5" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Edit Profile
            </DialogTitle>
          </DialogHeader>

          <form action={handleAction} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <input
                name="username"
                defaultValue={profile.username}
                className="w-full border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter username"
              />
            </div>

            {/* Avatar Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Avatar</label>

              <div className="flex items-center gap-4">
                <img
                  src={selectedAvatar}
                  alt="Preview"
                  className="w-14 h-14 rounded-full border shadow-sm"
                />

                <div className="grid grid-cols-5 gap-2">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`rounded-full border transition hover:scale-105 ${
                        selectedAvatar === avatar
                          ? "ring-2 ring-primary"
                          : "opacity-80"
                      }`}
                    >
                      <img
                        src={avatar}
                        className="w-10 h-10 rounded-full object-cover"
                        alt="avatar-option"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-primary text-primary-foreground py-2 font-medium shadow hover:opacity-90 disabled:opacity-60"
            >
              {pending ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
