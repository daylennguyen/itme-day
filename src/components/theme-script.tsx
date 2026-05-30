/** Runs before paint to avoid light/dark flash. */
export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem('itme-theme');var r=document.documentElement;if(t==='light'){r.classList.remove('dark');r.classList.add('light');}else{r.classList.add('dark');r.classList.remove('light');}}catch(e){document.documentElement.classList.add('dark');}})();`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
