# Content Folder

This folder holds chapter assets (scanned textbook pages, images, etc.) organized by subject and chapter.

## Convention

```
content/
└── {subject}/
    └── chapter-{n}/
        ├── page-01.jpg    ← book pages photographed or scanned
        ├── page-02.jpg
        └── ...
```

## Workflow

When new images are added to a chapter folder, the developer (Claude Code) will:

1. Read all images in the folder
2. Analyze the content
3. Create the corresponding `src/data/{subject}/chapter-{n}.ts` file
4. Create the page components
5. Register the chapter in `src/lib/chapters.ts`
