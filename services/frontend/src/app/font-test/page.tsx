'use client';

import { AVAILABLE_FONTS, getFontFamily } from '@/utils/fonts';

export default function FontTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Font Test Page</h1>

        <div className="space-y-4">
          {AVAILABLE_FONTS.map((font) => (
            <div key={font.name} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{font.name}</h3>
                  <p className="text-sm text-gray-500">{font.value}</p>
                  <p className="text-xs text-gray-400">Category: {font.category}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  {font.category}
                </span>
              </div>

              <div className="space-y-2">
                <p
                  style={{ fontFamily: getFontFamily(font.name), fontSize: '24px' }}
                  className="text-gray-900"
                >
                  The quick brown fox jumps over the lazy dog
                </p>
                <p
                  style={{ fontFamily: getFontFamily(font.name), fontSize: '18px' }}
                  className="text-gray-700"
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </p>
                <p
                  style={{ fontFamily: getFontFamily(font.name), fontSize: '18px' }}
                  className="text-gray-700"
                >
                  abcdefghijklmnopqrstuvwxyz 0123456789
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                {font.weights.slice(0, 5).map((weight) => (
                  <span
                    key={weight}
                    style={{
                      fontFamily: getFontFamily(font.name),
                      fontWeight: weight,
                    }}
                    className="px-2 py-1 bg-gray-100 text-sm rounded"
                  >
                    {weight}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Browser Font Availability Test</h2>
          <p className="text-sm text-gray-600 mb-4">
            Open browser DevTools → Network tab and reload this page to see which fonts are being downloaded.
          </p>
          <button
            onClick={() => {
              const results = AVAILABLE_FONTS.map((font) => {
                const testDiv = document.createElement('div');
                testDiv.style.fontFamily = getFontFamily(font.name);
                testDiv.style.fontSize = '16px';
                testDiv.textContent = 'Test';
                document.body.appendChild(testDiv);

                const computedFont = window.getComputedStyle(testDiv).fontFamily;
                document.body.removeChild(testDiv);

                return {
                  name: font.name,
                  expected: getFontFamily(font.name),
                  actual: computedFont,
                  working: computedFont.includes(font.name.split(' ')[0]) ||
                           font.category === 'sans-serif' && computedFont.includes('Arial'),
                };
              });

              console.table(results);
              alert('Font test results logged to console. Press F12 to view.');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Run Font Detection Test
          </button>
        </div>
      </div>
    </div>
  );
}
