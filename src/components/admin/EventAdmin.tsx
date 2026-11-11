import { useState, type FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import type { ChurchEvent, EventInput } from '../../lib/types';
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
  events: ChurchEvent[];
  reload: () => Promise<void>;
}

const emptyForm = (): EventInput => ({
  title: '',
  description: '',
  event_date: new Date().toISOString().slice(0, 10),
  time: '',
  location: '',
  image_url: '',
});

export default function EventAdmin({ events, reload }: Props) {
  const [editing, setEditing] = useState<ChurchEvent | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<ChurchEvent | null>(null);
  const [form, setForm] = useState<EventInput>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const openCreate = () => {
    setForm(emptyForm());
    setFormError(null);
    setCreating(true);
  };

  const openEdit = (event: ChurchEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, created_at: _c, ...rest } = event;
    setForm(rest);
    setFormError(null);
    setEditing(event);
  };

  const close = () => {
    setCreating(false);
    setEditing(null);
    setDeleteError(null);
  };

  const update =
    (field: keyof EventInput) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

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
      description: form.description.trim(),
      event_date: form.event_date,
      time: form.time.trim(),
      location: form.location.trim(),
      image_url: form.image_url.trim(),
    };

    const result = editing
      ? await supabase.from('events').update(payload).eq('id', editing.id)
      : await supabase.from('events').insert(payload);

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
      .from('events')
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
            Events
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            {events.length} event{events.length === 1 ? '' : 's'} scheduled
          </p>
        </div>
        <button onClick={openCreate} className="btn-gold px-5 py-2 text-xs">
          Add Event
        </button>
      </div>

      {deleteError && (
        <div className="mt-4">
          <ErrorBanner message={deleteError} />
        </div>
      )}

      {events.length === 0 ? (
        <div className="mt-6">
          <EmptyState message="No events yet. Click “Add Event” to put the first one on the calendar." />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card"
            >
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-navy text-white">
                <span className="text-sm font-bold text-gold-light">
                  {event.event_date.slice(8, 10)}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/70">
                  {new Date(event.event_date + 'T12:00:00').toLocaleDateString(
                    'en-US',
                    { month: 'short' }
                  )}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-navy">{event.title}</p>
                <p className="mt-0.5 truncate text-xs text-neutral-500">
                  {event.event_date} • {event.time || 'Time TBA'} •{' '}
                  {event.location || 'Location TBA'}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => openEdit(event)}
                  className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-neutral-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteError(null);
                    setDeleting(event);
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
        <Modal title={editing ? 'Edit Event' : 'Add Event'} onClose={close}>
          <CrudFormShell
            onSubmit={handleSubmit}
            submitLabel={editing ? 'Save Changes' : 'Add Event'}
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
                placeholder="Community Fall Festival"
                className={inputClasses}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date">
                <input
                  type="date"
                  required
                  value={form.event_date}
                  onChange={update('event_date')}
                  className={inputClasses}
                />
              </Field>
              <Field label="Time" optional>
                <input
                  type="text"
                  value={form.time}
                  onChange={update('time')}
                  placeholder="11:00 AM – 3:00 PM"
                  className={inputClasses}
                />
              </Field>
            </div>
            <Field label="Location" optional>
              <input
                type="text"
                value={form.location}
                onChange={update('location')}
                placeholder="Fellowship Hall"
                className={inputClasses}
              />
            </Field>
            <Field label="Description" optional>
              <textarea
                rows={3}
                value={form.description}
                onChange={update('description')}
                placeholder="What can people expect?"
                className={inputClasses}
              />
            </Field>
            <Field label="Image URL" optional>
              <input
                type="url"
                value={form.image_url}
                onChange={update('image_url')}
                placeholder="https://images.pexels.com/..."
                className={inputClasses}
              />
            </Field>
          </CrudFormShell>
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete Event" onClose={() => setDeleting(null)}>
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
