import React from 'react';

const illustrations = [
  {file: 'user-flow', alt: 'A person organizing connected screens into a clear workflow.'},
  {file: 'data-extraction', alt: 'A database, documents, and dashboard bringing business information together.'},
  {file: 'webinar', alt: 'An instructor teaching online with learning resources.'},
];

export default function ServiceIllustration({type}) {
  const illustration = illustrations[type];
  return <div className="service-illustration service-artwork">
    <img src={`/assets/storyset/${illustration.file}.svg`} alt={illustration.alt}
      width="500" height="500" loading="lazy" decoding="async" />
  </div>;
}
