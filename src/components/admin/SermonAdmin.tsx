import { useState, type FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import type { Sermon, SermonInput } from '../../lib/types';
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
  sermons: Sermon[];
  reload: () => Promise<void>;
}

const emptyForm: SermonInput = {
  title: '',
  speaker: '',
  sermon_date: new Date().toISOString().slice(0, 10),
  topic: '',
  scripture: '',
  description: '',
  youtube_id: '',
  thumbnail_url: '',
};

export default function SermonAdmin({ sermons, reload }: Props) {
  const [editing, setEditing] = useState<Sermon | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Sermon | null>(null);
  const [form, setForm] = useState<SermonInput>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const openCreate = () => {
    setForm(emptyForm);
    setFormError(null);
    setCreating(true);
  };

  const openEdit = (sermon: Sermon) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, created_at: _c, ...rest } = sermon;
    setForm(rest);
    setFormError(null);
    setEditing(sermon);
  };

  const close = () => {
    setCreating(false);
    setEditing(null);
    setDeleteError(null);
  };

  const update =
    (field: keyof SermonInput) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.speaker.trim()) {
      setFormError('Title and speaker are required.');
      return;
    }
    setSaving(true);
    setFormError(null);

    const payload = {
      title: form.title.trim(),
      speaker: form.speaker.trim(),
      sermon_date: form.sermon_date,
      topic: form.topic.trim() || 'General',
      scripture: form.scripture.trim(),
      description: form.description.trim(),
      youtube_id: form.youtube_id.trim(),
      thumbnail_url: form.thumbnail_url.trim(),
    };

    const result = editing
      ? await supabase.from('sermons').update(payload).eq('id', editing.id)
      : await supabase.from('sermons').insert(payload);

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
      .from('sermons')
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
            Sermons
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            {sermons.length} sermon{sermons.length === 1 ? '' : 's'} in the
            archive
          </p>
        </div>
        <button onClick={openCreate} className="btn-gold px-5 py-2 text-xs">
          Add Sermon
        </button>
      </div>

      {deleteError && (
        <div className="mt-4">
          <ErrorBanner message={deleteError} />
        </div>
      )}

      {sermons.length === 0 ? (
        <div className="mt-6">
          <EmptyState message="No sermons yet. Click “Add Sermon” to post the first one." />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {sermons.map((sermon) => (
            <li
              key={sermon.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card"
            >
              <img
                src={sermon.thumbnail_url}
                alt=""
                className="hidden h-14 w-24 shrink-0 rounded-lg object-cover sm:block"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-navy">
                  {sermon.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-neutral-500">
                  {sermon.speaker} • {sermon.sermon_date} • {sermon.topic}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => openEdit(sermon)}
                  className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-neutral-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteError(null);
                    setDeleting(sermon);
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
          title={editing ? 'Edit Sermon' : 'Add Sermon'}
          onClose={close}
        >
          <CrudFormShell
            onSubmit={handleSubmit}
            submitLabel={editing ? 'Save Changes' : 'Add Sermon'}
            submitting={saving}
            error={formError}
            onCancel={close}
          >
            <Field label="Title">
              <input
                type="text"
                required
                value={form.title}
                onChange={update('title')}
                placeholder="The God Who Sees You"
                className={inputClasses}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Speaker">
                <input
                  type="text"
                  required
                  value={form.speaker}
                  onChange={update('speaker')}
                  placeholder="Pastor David Whitfield"
                  className={inputClasses}
                />
              </Field>
              <Field label="Date">
                <input
                  type="date"
                  required
                  value={form.sermon_date}
                  onChange={update('sermon_date')}
                  className={inputClasses}
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Topic">
                <input
                  type="text"
                  value={form.topic}
                  onChange={update('topic')}
                  placeholder="Hope"
                  className={inputClasses}
                />
              </Field>
              <Field label="Scripture" optional>
                <input
                  type="text"
                  value={form.scripture}
                  onChange={update('scripture')}
                  placeholder="Genesis 16:1-13"
                  className={inputClasses}
                />
              </Field>
            </div>
            <Field label="YouTube Video ID">
              <input
                type="text"
                value={form.youtube_id}
                onChange={update('youtube_id')}
                placeholder="ZvReYu8yWFk"
                className={inputClasses}
              />
              <p className="mt-1.5 text-xs text-neutral-400">
                The part after “watch?v=” in the YouTube link.
              </p>
            </Field>
            <Field label="Description">
              <textarea
                rows={3}
                value={form.description}
                onChange={update('description')}
                placeholder="A short summary of the message..."
                className={inputClasses}
              />
            </Field>
            <Field label="Thumbnail Image URL" optional>
              <input
                type="url"
                value={form.thumbnail_url}
                onChange={update('thumbnail_url')}
                placeholder="https://images.pexels.com/..."
                className={inputClasses}
              />
            </Field>
          </CrudFormShell>
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete Sermon" onClose={() => setDeleting(null)}>
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
