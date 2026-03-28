import { useState } from 'react';
import FilterBar from './FilterBar';
import TemplateGrid from './TemplateGrid';

export default function TemplateSection() {
  const [businessName, setBusinessName] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleSearch = ({ businessName: name, keywords: kw }) => {
    setBusinessName(name);
    setKeywords(kw);
  };

  return (
    <>
      <FilterBar onSearch={handleSearch} />
      <TemplateGrid businessName={businessName} keywords={keywords} />
    </>
  );
}
