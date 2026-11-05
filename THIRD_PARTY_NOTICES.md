# Third-party notices

The root MIT License covers the project's original code and documentation, not ownership of third-party dependencies. Package code is not vendored in this repository. `package-lock.json` pins dependencies, and `DEPENDENCY_LICENSES.json` records their declared license metadata at release preparation. Keep the actual package license files when redistributing installed or bundled dependencies; metadata is not a substitute for those terms.

## UI components

Files under `src/components/ui` include shadcn/ui-derived components using Radix UI, React, and related packages. The shadcn notice is reproduced below. Source: https://github.com/shadcn-ui/ui/blob/main/LICENSE.md (verified at blob fad4d887a681dd49233e5ed01ee2c7a1513089a0).

MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Base44 and other packages

The application uses the Base44 JavaScript SDK and Vite plugin, whose installed package metadata declares MIT. Base44 hosted services are separate products with their own terms; this project does not sublicense hosted access or service credits.

Other direct dependencies include React, React Router, TanStack Query, Radix UI, Lucide, Recharts, and the UI utilities listed in package.json. Most dependency licenses are MIT, ISC, BSD, or Apache-2.0. Transitive development tooling also includes the Python-2.0 and CC-BY-4.0 licenses. `xmlhttprequest-ssl` uses a legacy `licenses` metadata field and an included MIT LICENSE file. Unused map, payment, PDF, editor, and 3D template packages were removed.

The original remote fonts and fallback image were replaced with local/system alternatives. Research references identify publications; they do not transfer ownership of those publications, reproduce a licensed questionnaire, or establish validation of this app.
