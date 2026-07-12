import React, { useState, useEffect, useRef } from "react";
import { X, ShieldCheck, Lock, Sparkles, Copy, CheckCircle, User, Phone, ArrowRight, Clock, MessageCircle } from "lucide-react";
import { Plan, CheckoutForm } from "../types";
import { trackPixel } from "../tracking";
import { buildWhatsAppLink } from "../config";

interface CheckoutModalProps {
  plan: Plan;
  onClose: () => void;
}

// Máscara de telefone BR: (99) 99999-9999
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// Copia com fallback para webviews (Instagram/Facebook bloqueiam navigator.clipboard)
function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => legacyCopy(text));
  }
  return Promise.resolve(legacyCopy(text));
}

function legacyCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

const RESERVATION_SECONDS = 10 * 60;

export default function CheckoutModal({ plan, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    paymentMethod: "pix",
  });

  const [formErrors, setFormErrors] = useState<string>("");
  const [copiedPix, setCopiedPix] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESERVATION_SECONDS);
  const pixInputRef = useRef<HTMLInputElement>(null);

  const pixCode = plan.pixCode || "";

  // Evento Pixel: abriu o checkout
  useEffect(() => {
    trackPixel("InitiateCheckout", {
      content_name: plan.title,
      value: plan.price,
      currency: "BRL",
    });
  }, [plan.id]);

  // Timer de reserva da oferta (urgência real de sessão)
  useEffect(() => {
    if (step !== 2) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const timerLabel = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "phone" ? formatPhone(value) : value,
    });
    setFormErrors("");
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (form.name.trim().length < 3) {
      setFormErrors("Digite seu nome completo para gerarmos seu acesso.");
      return;
    }
    if (phoneDigits.length < 10) {
      setFormErrors("Digite um WhatsApp válido com DDD. Ex: (11) 99999-9999");
      return;
    }
    trackPixel("Lead", { content_name: plan.title }, { phone: form.phone });
    trackPixel("AddPaymentInfo", {
      content_name: plan.title,
      value: plan.price,
      currency: "BRL",
    }, { phone: form.phone });
    setStep(2);
  };

  const handleConfirmPayment = () => {
    trackPixel("Purchase", {
      content_name: plan.title,
      value: plan.price,
      currency: "BRL",
    }, { phone: form.phone });
    setStep(3);
  };

  const copyPixCode = async () => {
    const ok = await copyToClipboard(pixCode);
    if (ok) {
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2500);
    } else if (pixInputRef.current) {
      // Último recurso: seleciona o texto para o usuário copiar manualmente
      pixInputRef.current.focus();
      pixInputRef.current.select();
      setFormErrors("Não foi possível copiar automaticamente. Segure sobre o código selecionado e toque em Copiar.");
    }
  };

  const firstName = form.name.trim().split(" ")[0];
  const whatsAppProofLink = buildWhatsAppLink(
    `Olá! Acabei de pagar o ${plan.title} (R$ ${plan.price.toFixed(2).replace(".", ",")}) via Pix.\n\nNome: ${form.name}\nWhatsApp: ${form.phone}\n\nSegue o comprovante para ativação imediata do meu acesso ULTRAFLIX. 🚀`
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      {/* Container Card */}
      <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-red-950/40 rounded-3xl overflow-hidden shadow-2xl shadow-red-600/5 my-auto flex flex-col">

        {/* Header Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 text-gray-500 hover:text-white bg-[#151515] p-1.5 rounded-full hover:scale-105 transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="bg-gradient-to-r from-red-950/40 via-red-900/10 to-red-950/40 px-6 py-5 border-b border-gray-900 flex items-center space-x-3">
          <div className="bg-red-600 p-1 rounded-lg">
            <Sparkles className="w-4 h-4 text-white fill-white/20" />
          </div>
          <div>
            <h4 className="font-display font-extrabold text-sm sm:text-base text-white tracking-wide uppercase">
              Finalizar Assinatura
            </h4>
            <p className="font-sans text-[10px] sm:text-xs text-gray-400">
              Você escolheu o <strong className="text-red-500">{plan.title}</strong> por{" "}
              {plan.anchorPrice && (
                <span className="line-through text-gray-600 mr-1">
                  R$ {plan.anchorPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
              <strong className="text-white">R$ {plan.price.toFixed(2).replace(".", ",")}</strong>
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-900 h-1">
          <div
            className="bg-red-600 h-1 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Main interactive form space */}
        <div className="p-6 flex-1">

          {/* STEP 1: CONTACT DETAILS */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="text-center mb-6">
                <p className="font-display font-bold text-white text-base">
                  Crie sua conta ULTRAFLIX
                </p>
                <p className="font-sans text-xs text-gray-400 mt-1">
                  Leva menos de 30 segundos. Usamos seu WhatsApp para enviar o acesso na hora.
                </p>
              </div>

              {formErrors && (
                <div className="bg-red-950/40 border border-red-600/30 text-red-400 p-3 rounded-xl text-xs text-center font-semibold">
                  {formErrors}
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-400 font-display">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-600" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    autoComplete="name"
                    placeholder="Ex: João Silva Santos"
                    className="w-full bg-[#050505] border border-gray-900 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all font-sans"
                    required
                  />
                </div>
              </div>

              {/* WhatsApp Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-400 font-display">WhatsApp (para ativação rápida)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-600" />
                  <input
                    type="tel"
                    name="phone"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={handleInputChange}
                    autoComplete="tel-national"
                    placeholder="(11) 99999-9999"
                    className="w-full bg-[#050505] border border-gray-900 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all font-sans"
                    required
                  />
                </div>
              </div>

              {/* Proceed Button */}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white py-4 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center justify-center space-x-1"
              >
                <span>Ir para o Pagamento Pix</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[10px] text-gray-600 font-sans">
                🔒 Seus dados são usados apenas para ativar e dar suporte ao seu acesso.
              </p>
            </form>
          )}

          {/* STEP 2: PIX PAYMENT */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center">
                <p className="font-display font-bold text-white text-base">
                  Pague com Pix e assista em minutos
                </p>
                <div className="mt-2 inline-flex items-center space-x-1.5 bg-amber-950/20 border border-amber-900/30 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-mono text-[10px] text-amber-500 font-bold">
                    Preço reservado por {timerLabel}
                  </span>
                </div>
              </div>

              {formErrors && (
                <div className="bg-red-950/40 border border-red-600/30 text-red-400 p-3 rounded-xl text-xs text-center font-semibold">
                  {formErrors}
                </div>
              )}

              {/* PIX AREA DETAILS */}
              <div className="bg-[#050505] border border-gray-900 rounded-2xl p-4 text-center space-y-4">
                <div className="flex justify-center">
                  {/* QR Code gerado a partir do código Pix Copia e Cola exato */}
                  <div className="bg-white p-3 rounded-2xl flex items-center justify-center shadow-lg shadow-black/40">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=000000&data=${encodeURIComponent(pixCode)}`}
                      alt="Pix QR Code"
                      referrerPolicy="no-referrer"
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                </div>

                <p className="font-sans text-xs text-gray-400">
                  Escaneie o QR Code no app do seu banco <strong className="text-gray-300">ou</strong> copie o código abaixo:
                </p>

                {/* Código visível + selecionável (fallback p/ navegador do Instagram) */}
                <input
                  ref={pixInputRef}
                  type="text"
                  readOnly
                  value={pixCode}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="w-full bg-[#0a0a0a] border border-gray-900 rounded-xl py-2.5 px-3 font-mono text-[10px] text-gray-400 text-center focus:outline-none focus:border-red-600/40 select-all"
                />

                <button
                  type="button"
                  onClick={copyPixCode}
                  className={`w-full font-sans text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-[0.98] border ${
                    copiedPix
                      ? "bg-emerald-950/30 border-emerald-600/40 text-emerald-400"
                      : "bg-[#111111] border-gray-800 hover:border-red-600/40 text-white"
                  }`}
                >
                  {copiedPix ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-red-500" />
                  )}
                  <span>{copiedPix ? "Código copiado! Agora cole no app do banco" : "Copiar Código Pix Copia e Cola"}</span>
                </button>

                <div className="text-center pt-1">
                  <span className="inline-block font-mono text-[10px] text-amber-500 bg-amber-950/20 px-3 py-1.5 rounded-xl border border-amber-900/30">
                    ⚡ Ativação em até 5 minutos após o pagamento
                  </span>
                </div>
              </div>

              {/* Action Confirmation Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white py-4 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-lg shadow-red-600/20"
                >
                  <Lock className="w-4 h-4 text-white" />
                  <span>Já paguei, quero meu acesso</span>
                </button>
              </div>

              {/* Garantia: reforço no momento de maior medo */}
              <p className="text-center text-[11px] text-emerald-400/90 font-sans font-semibold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Compra protegida: 7 dias de garantia ou seu dinheiro de volta
              </p>

              {/* Navigation Back button */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-xs text-gray-500 hover:text-white font-sans transition-colors cursor-pointer"
              >
                Voltar e alterar dados cadastrais
              </button>
            </div>
          )}

          {/* STEP 3: SEND PROOF VIA WHATSAPP -> ACTIVATION */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/10">
                  <CheckCircle className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-display font-black text-xl text-white uppercase">
                  Falta só 1 passo{firstName ? `, ${firstName}` : ""}!
                </h3>
                <p className="font-sans text-xs text-gray-400 mt-2 max-w-xs mx-auto">
                  Envie o comprovante do Pix no WhatsApp e nossa equipe libera seu login e senha{" "}
                  <strong className="text-white">em até 5 minutos</strong>, com tutorial de instalação para sua TV ou celular.
                </p>
              </div>

              {/* Big WhatsApp CTA */}
              <a
                href={whatsAppProofLink}
                target="_blank"
                rel="noopener noreferrer"
                id="btn_enviar_comprovante"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white py-4 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-green-600/25"
              >
                <MessageCircle className="w-5 h-5 fill-white/10" />
                <span>Enviar Comprovante no WhatsApp</span>
              </a>

              {/* What happens next */}
              <div className="space-y-2 text-xs text-gray-400 font-sans border-t border-gray-950 pt-4">
                <p className="font-display font-bold text-white text-xs mb-2">O que acontece agora:</p>
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-red-950/30 text-red-500 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">1</div>
                  <p>Você envia o comprovante — a mensagem já vai pronta com seus dados.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-red-950/30 text-red-500 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">2</div>
                  <p>Recebemos, confirmamos o Pix e criamos seu usuário e senha exclusivos.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-red-950/30 text-red-500 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">3</div>
                  <p>Você recebe o acesso + tutorial em vídeo e já começa a assistir. 🍿</p>
                </div>
              </div>

              <p className="text-center text-[10px] text-gray-600 font-sans">
                Garantia de 7 dias: não gostou, devolvemos seu dinheiro.
              </p>
            </div>
          )}

        </div>

        {/* Safe Badge Footer */}
        {step < 3 && (
          <div className="bg-[#090909] py-3.5 px-6 border-t border-gray-950 flex items-center justify-between text-gray-500 text-[10px] sm:text-xs">
            <div className="flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/10 shrink-0" />
              <span>Pagamento via Pix • Banco Central</span>
            </div>
            <span>Ativação Rápida ⚡</span>
          </div>
        )}

      </div>
    </div>
  );
}
