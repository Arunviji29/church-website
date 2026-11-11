import { useState, type FormEvent } from 'react';
import { Pin } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Announcement, AnnouncementInput } from '../../lib/types';
import {
  Field,
  inputClasses,
  Modal,
  ConfirmDelete,
  CrudFormShell,
  ErrorBanner,
  EmptyState,
} from './ui';

interface Props {
  announcements: Announcement[];
  reload: () => Promise<void>;
}

const emptyForm: AnnouncementInput = {
  title: '',
  body: '',
  pinned: false,
};

export default function AnnouncementAdmin({
  announcements,
  reload,
}: Props) {
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Announcement | null>(null);
  const [form, setForm] = useState<AnnouncementInput>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const openCreate = () => {
    setForm(emptyForm);
    setFormError(null);
    setCreating(true);
  };

  const openEdit = (announcement: Announcement) => {
    setForm({
      title: announcement.title,
      body: announcement.body,
      pinned: announcement.pinned,
    });
    setFormError(null);
    setEditing(announcement);
  };

  const close = () => {
    setCreating(false);
    setEditing(null);
    setDeleteError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError('Title is required.');
      return;
    }
    setSaving(true);
    setFormError(null);

    const payload = {
      title: form.title.trim(),
      body: form.body.trim(),
      pinned: form.pinned,
    };

    const result = editing
      ? await supabase
          .from('announcements')
          .update(payload)
          .eq('id', editing.id)
      : await supabase.from('announcements').insert(payload);

    if (result.error) {
      setFormError(result.error.message);
      setSaving(false);
      return;
    }
    await reload();
    setSaving(false);
    close();
  };

  const handleDelete = async () => {
    if (!deleting) return;
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', deleting.id);
    if (error) {
      setDeleteError(error.message);
      return;
    }
    await reload();
    setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-navy">
            Announcements
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Shown on the home page — pinned items appear first
          </p>
        </div>
        <button onClick={openCreate} className="btn-gold px-5 py-2 text-xs">
          Add Announcement
        </button>
      </div>

      {deleteError && (
        <div className="mt-4">
          <ErrorBanner message={deleteError} />
        </div>
      )}

      {announcements.length === 0 ? (
        <div className="mt-6">
          <EmptyState message="No announcements yet. Click “Add Announcement” to share the first one." />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {announcements.map((announcement) => (
            <li
              key={announcement.id}
              className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-card"
            >
              <span
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  announcement.pinned
                    ? 'bg-gold-pale text-gold-dark'
                    : 'bg-neutral-100 text-neutral-400'
                }`}
                title={announcement.pinned ? 'Pinned' : 'Standard'}
              >
                <Pin
                  size={15}
                  className={announcement.pinned ? 'rotate-45' : ''}
                  aria-hidden
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-navy">{announcement.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
                  {announcement.body}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => openEdit(announcement)}
                  className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-neutral-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteError(null);
                    setDeleting(announcement);
                  }}
                  className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {(creating || editing) && (
        <Modal
          title={editing ? 'Edit Announcement' : 'Add Announcement'}
          onClose={close}
        >
          <CrudFormShell
            onSubmit={handleSubmit}
            submitLabel={editing ? 'Save Changes' : 'Add Announcement'}
            submitting={saving}
            error={formError}
            onCancel={close}
          >
            <Field label="Title">
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="New Sermon Series Starts Sunday"
                className={inputClasses}
              />
            </Field>
            <Field label="Message">
              <textarea
                rows={4}
                value={form.body}
                onChange={(e) =>
                  setForm((f) => ({ ...f, body: e.target.value }))
                }
                placeholder="Write the announcement..."
                className={inputClasses}
              />
            </Field>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-cream px-4 py-3">
              <input
                type="checkbox"
                checked={form.pinned}
                onChange={(e) =>
                  setForm((f) => ({ ...f, pinned: e.target.checked }))
                }
                className="h-4 w-4 accent-[#c9a14a]"
              />
              <span className="text-sm font-medium text-navy">
                Pin to the top
              </span>
            </label>
          </CrudFormShell>
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete Announcement" onClose={() => setDeleting(null)}>
          <ConfirmDelete
            name={deleting.title}
            onConfirm={handleDelete}
            onCancel={() => setDeleting(null)}
          />
        </Modal>
      )}
    </div>
  );
}
