import { useEffect, useMemo, useState } from "react";
import { Loader2, Mail, Phone, Trash2, ChevronDown, ChevronUp, Inbox } from "lucide-react";
import { toast } from "sonner";
import {
  fetchInquiriesAdmin,
  updateInquiryAdmin,
  deleteInquiryAdmin,
  INQUIRY_STATUSES,
  type InquiryRecord,
  type InquiryStatus,
} from "@/lib/inquiries.server";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<InquiryStatus, string> = {
  new: "New",
  read: "Read",
  contacted: "Contacted",
  archived: "Archived",
};

const STATUS_STYLE: Record<InquiryStatus, string> = {
  new: "bg-teal-soft text-teal",
  read: "bg-muted text-muted-foreground",
  contacted: "bg-amber-100 text-amber-700",
  archived: "bg-border text-muted-foreground",
};

const FILTERS = ["all", ...INQUIRY_STATUSES] as const;

export function InquiriesManager() {
  const [inquiries, setInquiries] = useState<InquiryRecord[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  async function load() {
    setLoadError(null);
    try {
      setInquiries(await fetchInquiriesAdmin());
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load inquiries.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: inquiries?.length ?? 0 };
    for (const s of INQUIRY_STATUSES) base[s] = inquiries?.filter((i) => i.status === s).length ?? 0;
    return base;
  }, [inquiries]);

  const visible = useMemo(() => {
    if (!inquiries) return [];
    return filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);
  }, [inquiries, filter]);

  async function changeStatus(inquiry: InquiryRecord, status: InquiryStatus) {
    setSavingId(inquiry.id);
    // Optimistic — this is a status label, not a destructive action, so we
    // don't need a loading placeholder for the whole row.
    setInquiries((prev) => prev?.map((i) => (i.id === inquiry.id ? { ...i, status } : i)) ?? prev);
    try {
      await updateInquiryAdmin({ data: { id: inquiry.id, status } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update status.");
      void load();
    } finally {
      setSavingId(null);
    }
  }

  async function saveNotes(inquiry: InquiryRecord) {
    setSavingId(inquiry.id);
    try {
      await updateInquiryAdmin({ data: { id: inquiry.id, notes: notesDraft } });
      setInquiries((prev) => prev?.map((i) => (i.id === inquiry.id ? { ...i, notes: notesDraft } : i)) ?? prev);
      toast.success("Notes saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save notes.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(inquiry: InquiryRecord) {
    if (!window.confirm(`Delete the inquiry from "${inquiry.name}"? This can't be undone.`)) return;
    setSavingId(inquiry.id);
    try {
      await deleteInquiryAdmin({ data: { id: inquiry.id } });
      setInquiries((prev) => prev?.filter((i) => i.id !== inquiry.id) ?? prev);
      toast.success("Inquiry deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete inquiry.");
    } finally {
      setSavingId(null);
    }
  }

  function toggleExpand(inquiry: InquiryRecord) {
    if (expandedId === inquiry.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(inquiry.id);
    setNotesDraft(inquiry.notes ?? "");
    if (inquiry.status === "new") void changeStatus(inquiry, "read");
  }

  if (loadError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {loadError}{" "}
        <button type="button" onClick={() => void load()} className="font-semibold underline">
          Retry
        </button>
      </div>
    );
  }

  if (!inquiries) {
    return (
      <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading inquiries…
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-navy">Contact Inquiries</h2>
          <p className="text-sm text-muted-foreground">Submissions from the website contact form.</p>
        </div>
        <div className="flex flex-wrap gap-1.5 rounded-full border border-border bg-background p-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                filter === f ? "gradient-teal text-white" : "text-muted-foreground hover:bg-muted",
              )}
            >
              {f === "all" ? "All" : STATUS_LABEL[f]} ({counts[f]})
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-14 text-center">
          <Inbox className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No inquiries here yet.</p>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-border">
          {visible.map((inquiry) => {
            const expanded = expandedId === inquiry.id;
            return (
              <li key={inquiry.id} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleExpand(inquiry)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-sm font-bold text-navy">{inquiry.name}</span>
                      <span className={cn("rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide", STATUS_STYLE[inquiry.status])}>
                        {STATUS_LABEL[inquiry.status]}
                      </span>
                      {inquiry.enquiry_type && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                          {inquiry.enquiry_type}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{inquiry.message}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                    <span>{new Date(inquiry.created_at).toLocaleDateString()}</span>
                    {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {expanded && (
                  <div className="mt-4 rounded-2xl border border-border bg-background p-5">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-1.5 font-medium text-teal hover:underline">
                        <Mail className="h-3.5 w-3.5" /> {inquiry.email}
                      </a>
                      {inquiry.phone && (
                        <a href={`tel:${inquiry.phone}`} className="inline-flex items-center gap-1.5 font-medium text-teal hover:underline">
                          <Phone className="h-3.5 w-3.5" /> {inquiry.phone}
                        </a>
                      )}
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground">{inquiry.message}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status:</span>
                      {INQUIRY_STATUSES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          disabled={savingId === inquiry.id}
                          onClick={() => void changeStatus(inquiry, s)}
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-semibold transition-colors disabled:opacity-60",
                            inquiry.status === s ? STATUS_STYLE[s] : "border border-border text-muted-foreground hover:bg-muted",
                          )}
                        >
                          {STATUS_LABEL[s]}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4">
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Internal notes
                      </label>
                      <textarea
                        value={notesDraft}
                        onChange={(e) => setNotesDraft(e.target.value)}
                        rows={2}
                        placeholder="Follow-up notes, next steps…"
                        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
                      />
                      <div className="mt-2 flex justify-between">
                        <button
                          type="button"
                          onClick={() => void handleDelete(inquiry)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                        <button
                          type="button"
                          disabled={savingId === inquiry.id}
                          onClick={() => void saveNotes(inquiry)}
                          className="inline-flex items-center gap-1.5 rounded-full gradient-teal px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                        >
                          {savingId === inquiry.id && <Loader2 className="h-3 w-3 animate-spin" />}
                          Save notes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
