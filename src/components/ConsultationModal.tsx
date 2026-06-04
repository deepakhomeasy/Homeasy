// components/ConsultationModal.tsx
import { useRef, FormEvent } from 'react';
import { CheckCircle, X, ShieldCheck } from 'lucide-react';
import { LeadForm } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  isSubmitted: boolean;
  form: LeadForm;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  onFormChange: (updated: Partial<LeadForm>) => void;
  firstInputRef: React.RefObject<HTMLInputElement | null>;
}

export function ConsultationModal({
  isOpen,
  isSubmitted,
  form,
  onClose,
  onSubmit,
  onFormChange,
  firstInputRef,
}: ConsultationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-[100] animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl border border-outline-variant/20 relative animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-xl transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-7 md:p-8">
          {/* Modal Header */}
          <div className="text-center mb-5 sm:mb-7">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold">
              Request Priority Consultation
            </h3>
            <p className="text-[11px] sm:text-xs text-on-surface-variant mt-2 max-w-xs mx-auto">
              Submit your details to activate custom pricing estimates and
              arrange an architect slot.
            </p>
          </div>

          {/* Success State */}
          {isSubmitted ? (
            <div className="text-center py-6 sm:py-8 space-y-3 bg-primary rounded-2xl p-5 sm:p-6 animate-scale-in">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-display text-base sm:text-lg font-bold text-white">
                Request Logged!
              </h4>
              <p className="text-[11px] sm:text-xs text-white/80 max-w-xs mx-auto">
                A dedicated technology representative is preparing your
                personalized blueprint estimate. Expect contact within 2
                business hours.
              </p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1 sm:mb-1.5">
                  Full Name *
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  required
                  placeholder="Rajesh Mehra"
                  value={form.name}
                  onChange={(e) => onFormChange({ name: e.target.value })}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1 sm:mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => onFormChange({ phone: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1 sm:mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => onFormChange({ email: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              {/* Property Type + Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1 sm:mb-1.5">
                    Property Type
                  </label>
                  <select
                    value={form.propertyType}
                    onChange={(e) => onFormChange({ propertyType: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3 py-2.5 sm:py-3 text-sm outline-none text-on-surface-variant focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="Villa">Villa Estate</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Office</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1 sm:mb-1.5">
                    Budget
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => onFormChange({ budget: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3 py-2.5 sm:py-3 text-sm outline-none text-on-surface-variant focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="$10k - $25k">$10k – $25k</option>
                    <option value="$25k - $100k">$25k – $100k</option>
                    <option value="$100k+">$100k+ Luxury</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-container text-white font-bold py-3 sm:py-3.5 md:py-4 rounded-xl text-[11px] sm:text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 mt-1 active:scale-95 min-h-[44px] sm:min-h-[48px]"
              >
                Confirm Blueprint Consultation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
