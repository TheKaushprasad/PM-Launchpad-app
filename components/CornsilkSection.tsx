import React from 'react';

export interface CornsilkCardItem {
  subtitle: string;
  description: string;
  headerColor?: 'red' | 'blue';
}

export interface CornsilkSectionProps {
  title: string;
  titleColor?: 'red' | 'blue';
  items: CornsilkCardItem[];
  className?: string;
}

export const CornsilkSection: React.FC<CornsilkSectionProps> = ({
  title,
  titleColor = 'blue',
  items,
  className = ''
}) => {
  const mainTitleClass = titleColor === 'red' ? 'text-[#B91C1C]' : 'text-[#1D4ED8]';

  return (
    <section 
      style={{ backgroundColor: '#FFF8DC' }}
      className={`rounded-2xl border border-[#F3E5AB] p-4 sm:p-5 md:p-5 space-y-3 shadow-sm ${className}`}
    >
      <h3 className={`text-base md:text-lg font-black tracking-tight ${mainTitleClass}`}>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {items.map((item, idx) => {
          const color = item.headerColor || (idx % 2 === 0 ? 'red' : 'blue');
          const headerClass = color === 'red' ? 'text-[#DC2626]' : 'text-[#2563EB]';
          return (
            <div key={idx} className="space-y-1">
              <h4 className={`text-xs md:text-sm font-black tracking-tight ${headerClass}`}>
                {item.subtitle}
              </h4>
              <p className="text-black text-xs md:text-[13px] font-normal leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CornsilkSection;
