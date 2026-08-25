import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  FileText, 
  BookOpen, 
  X, 
  Trash2, 
  Copy, 
  Check, 
  Divide, 
  Percent, 
  Delete,
  Hash
} from 'lucide-react';
import { ESTIMATION_CHEAT_SHEET } from '../../data/estimationCheatSheet';

interface ScratchpadModalProps {
  isOpen: boolean;
  onClose: () => void;
  scratchpadNotes: string;
  setScratchpadNotes: (notes: string) => void;
}

export const ScratchpadModal: React.FC<ScratchpadModalProps> = ({
  isOpen,
  onClose,
  scratchpadNotes,
  setScratchpadNotes
}) => {
  const [activeTab, setActiveTab] = useState<'scratchpad' | 'calculator' | 'cheatSheet'>('scratchpad');
  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [calcEquation, setCalcEquation] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Calculator Logic
  const handleCalcInput = (val: string) => {
    if (val === 'C') {
      setCalcDisplay('0');
      setCalcEquation('');
    } else if (val === 'DEL') {
      if (calcDisplay.length > 1) {
        setCalcDisplay(calcDisplay.slice(0, -1));
      } else {
        setCalcDisplay('0');
      }
    } else if (val === '=') {
      try {
        // Safe evaluation of standard arithmetic
        const sanitized = (calcEquation + calcDisplay).replace(/×/g, '*').replace(/÷/g, '/');
        // Simple safe math evaluator without arbitrary code execution
        const result = Function('"use strict";return (' + sanitized + ')')();
        setCalcEquation(calcEquation + calcDisplay + ' =');
        setCalcDisplay(String(Number(result.toFixed(4))));
      } catch (err) {
        setCalcDisplay('Error');
      }
    } else if (['+', '-', '×', '÷', '%'].includes(val)) {
      setCalcEquation(calcEquation + ' ' + calcDisplay + ' ' + val + ' ');
      setCalcDisplay('0');
    } else {
      if (calcDisplay === '0' && val !== '.') {
        setCalcDisplay(val);
      } else {
        setCalcDisplay(calcDisplay + val);
      }
    }
  };

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(scratchpadNotes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden text-zinc-900"
        >
          {/* Top Bar Header */}
          <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
            <div className="flex items-center gap-2">
              <div className="flex bg-zinc-200/70 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('scratchpad')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab === 'scratchpad' ? 'bg-white text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" /> Scratchpad
                </button>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab === 'calculator' ? 'bg-white text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5" /> PM Calculator
                </button>
                <button
                  onClick={() => setActiveTab('cheatSheet')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                    activeTab === 'cheatSheet' ? 'bg-white text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" /> Estimation Constants
                </button>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 flex-1 overflow-y-auto min-h-[380px]">
            {/* TAB 1: SCRATCHPAD */}
            {activeTab === 'scratchpad' && (
              <div className="h-full flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Quick Working Notes (Not visible to interviewer)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyNotes}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-700 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied" : "Copy Notes"}
                    </button>
                    <button
                      onClick={() => setScratchpadNotes('')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-red-50 hover:text-red-600 text-xs font-bold text-zinc-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear
                    </button>
                  </div>
                </div>

                <textarea
                  value={scratchpadNotes}
                  onChange={(e) => setScratchpadNotes(e.target.value)}
                  placeholder="Type your structured outline, hypotheses, segmentation branches, or calculation scratchpad here..."
                  className="flex-1 w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm leading-relaxed text-zinc-800 resize-none min-h-[300px]"
                />
              </div>
            )}

            {/* TAB 2: CALCULATOR */}
            {activeTab === 'calculator' && (
              <div className="max-w-md mx-auto bg-zinc-900 text-white rounded-[2rem] p-6 shadow-xl border border-zinc-800">
                {/* Screen */}
                <div className="bg-zinc-950 p-4 rounded-2xl mb-6 text-right font-mono border border-zinc-800">
                  <div className="text-xs text-zinc-400 min-h-[20px] overflow-x-auto whitespace-nowrap">
                    {calcEquation}
                  </div>
                  <div className="text-3xl font-black text-white tracking-tight overflow-x-auto whitespace-nowrap">
                    {calcDisplay}
                  </div>
                </div>

                {/* Keypad Grid */}
                <div className="grid grid-cols-4 gap-2.5">
                  {['C', 'DEL', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '00', '.', '='].map((btn) => {
                    const isAction = ['C', 'DEL'].includes(btn);
                    const isOp = ['÷', '×', '-', '+', '%'].includes(btn);
                    const isEquals = btn === '=';

                    return (
                      <button
                        key={btn}
                        onClick={() => handleCalcInput(btn)}
                        className={`h-12 rounded-xl font-bold text-base transition-all active:scale-95 flex items-center justify-center ${
                          isEquals 
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30' 
                            : isOp 
                            ? 'bg-zinc-800 hover:bg-zinc-700 text-indigo-400' 
                            : isAction 
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                            : 'bg-zinc-800/80 hover:bg-zinc-700 text-white'
                        }`}
                      >
                        {btn}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: ESTIMATION CHEAT SHEET */}
            {activeTab === 'cheatSheet' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-black text-lg text-zinc-900 tracking-tight">PM Estimation Reference Standards</h3>
                  <p className="text-xs text-zinc-500 font-medium">Standardized industry population baselines and technology conversion benchmarks.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ESTIMATION_CHEAT_SHEET.map((group) => (
                    <div key={group.category} className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200/80 space-y-3">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-zinc-700 pb-2 border-b border-zinc-200">
                        {group.category}
                      </h4>
                      <div className="space-y-2">
                        {group.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start text-xs">
                            <div>
                              <span className="font-bold text-zinc-800 block">{item.label}</span>
                              <span className="text-[10px] text-zinc-400">{item.note}</span>
                            </div>
                            <span className="font-extrabold text-indigo-600 font-mono shrink-0 ml-2 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-zinc-100 bg-zinc-50 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-zinc-800"
            >
              Close Utilities
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
