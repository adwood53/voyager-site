// blogComponents.js (or wherever you define these)

export const portableTextComponents = {
  // 1. For block types (paragraph, h1, h2, etc.)
  block: {
    // The built-in "style" property from Sanity can be "normal", "h1", "h2", "h3", etc.
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold my-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold my-2">{children}</h3>
    ),
    // fallback for "normal" or unstyled blocks
    normal: ({ children }) => (
      <p className="my-2 leading-relaxed">{children}</p>
    ),
  },
  // 2. For custom types or marks (e.g. links), you can define them here
  marks: {
    // Example: custom link rendering
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={
            target === '_blank' ? 'noopener noreferrer' : undefined
          }
          className="text-blue-600 underline"
        >
          {children}
        </a>
      );
    },
  },
};
