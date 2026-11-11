import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon, Loader2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import { ErrorBanner } from '../components/admin/ui';
import { useGallery } from '../lib/hooks';
import type { GalleryItem } from '../lib/types';
import { IMAGES } from '../data';

interface Album {
  name: string;
  photos: GalleryItem[];
}

function groupByAlbum(items: GalleryItem[]): Album[] {
  const map = new Map<string, GalleryItem[]>();
  for (const item of items) {
    const list = map.get(item.album) ?? [];
    list.push(item);
    map.set(item.album, list);
  }
  return Array.from(map.entries()).map(([name, photos]) => ({ name, photos }));
}

export default function GalleryPage() {
  const { items, loading, error } = useGallery();
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const albums = groupByAlbum(items);
  const currentAlbum = albums.find((a) => a.name === activeAlbum) ?? null;
  const visiblePhotos = currentAlbum?.photos ?? items;
  const inLightbox = lightboxIndex !== null;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev + 1) % visiblePhotos.length
    );
  }, [visiblePhotos.length]);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
    );
  }, [visiblePhotos.length]);

  useEffect(() => {
    if (!inLightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [inLightbox, closeLightbox, nextPhoto, prevPhoto]);

  const openLightbox = (index: number) => setLightboxIndex(index);

  return (
    <>
      <PageHero
        title="Photo Gallery"
        subtitle="A glimpse into the life of our church family — festivals, worship, service, and celebration."
        image={IMAGES.community}
      />

      <section className="container-site py-16 sm:py-20">
        {/* Album filter */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveAlbum(null)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              activeAlbum === null
                ? 'border-gold bg-gold-pale text-navy'
                : 'border-neutral-200 bg-cream text-neutral-600 hover:border-gold hover:text-navy'
            }`}
          >
            All Photos
          </button>
          {albums.map((album) => (
            <button
              key={album.name}
              onClick={() => setActiveAlbum(album.name)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                activeAlbum === album.name
                  ? 'border-gold bg-gold-pale text-navy'
                  : 'border-neutral-200 bg-cream text-neutral-600 hover:border-gold hover:text-navy'
              }`}
            >
              {album.name}
              <span className="ml-1.5 text-xs text-neutral-400">
                {album.photos.length}
              </span>
            </button>
          ))}
        </div>

        {/* Error / loading / empty */}
        {error && (
          <div className="mt-10">
            <ErrorBanner message={`Could not load the gallery: ${error}`} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={34} className="animate-spin text-gold" aria-hidden />
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-12 text-center">
            <ImageIcon size={32} className="mx-auto text-neutral-300" aria-hidden />
            <p className="mt-3 text-sm text-neutral-500">
              No photos have been added to the gallery yet — check back soon!
            </p>
          </div>
        ) : activeAlbum === null ? (
          /* Album cards when viewing all */
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <button
                key={album.name}
                onClick={() => setActiveAlbum(album.name)}
                className="group overflow-hidden rounded-2xl bg-white text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={album.photos[0]?.image_url}
                    alt={album.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="font-serif text-lg font-semibold text-white">
                      {album.name}
                    </h2>
                    <p className="mt-0.5 text-xs text-white/80">
                      {album.photos.length} photo{album.photos.length === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Photo grid when an album is selected */
          <div className="mt-10">
            <button
              onClick={() => setActiveAlbum(null)}
              className="mb-4 text-sm font-semibold text-gold-dark transition-colors hover:text-navy"
            >
              ← Back to all albums
            </button>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              {currentAlbum?.name}
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {visiblePhotos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  className="group relative overflow-hidden rounded-xl bg-navy shadow-card"
                >
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/90 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {photo.title}
                      </p>
                      {photo.caption && (
                        <p className="mt-0.5 text-xs text-white/75">
                          {photo.caption}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {inLightbox && lightboxIndex !== null && visiblePhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/95 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close viewer"
          >
            <X size={24} />
          </button>

          {/* Previous */}
          {visiblePhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* Image */}
          <figure
            className="flex max-h-[88vh] max-w-5xl flex-col items-center px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={visiblePhotos[lightboxIndex].image_url}
              alt={visiblePhotos[lightboxIndex].title}
              className="max-h-[76vh] max-w-full rounded-xl object-contain"
            />
            <figcaption className="mt-4 text-center">
              <p className="font-serif text-lg font-semibold text-white">
                {visiblePhotos[lightboxIndex].title}
              </p>
              {visiblePhotos[lightboxIndex].caption && (
                <p className="mt-1 text-sm text-white/70">
                  {visiblePhotos[lightboxIndex].caption}
                </p>
              )}
              <p className="mt-2 text-xs text-white/40">
                {lightboxIndex + 1} of {visiblePhotos.length}
              </p>
            </figcaption>
          </figure>

          {/* Next */}
          {visiblePhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
              aria-label="Next photo"
            >
              <ChevronRight size={26} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
