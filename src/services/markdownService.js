class MarkdownService {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  }

  // Parse frontmatter (YAML) from markdown
  parseFrontmatter(content) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) {
      throw new Error('Invalid markdown format: missing frontmatter');
    }

    const [, frontmatterYaml, markdownContent] = frontmatterMatch;
    const frontmatter = {};

    // Simple YAML parser for our specific needs
    frontmatterYaml.split('\n').forEach(line => {
      line = line.trim();
      if (!line || line.startsWith('#')) return;

      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) return;

      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Parse arrays (categories)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => {
          item = item.trim();
          if ((item.startsWith('"') && item.endsWith('"')) || 
              (item.startsWith("'") && item.endsWith("'"))) {
            item = item.slice(1, -1);
          }
          return item;
        });
      }

      frontmatter[key] = value;
    });

    return { frontmatter, content: markdownContent };
  }

  // Parse markdown content sections
  parseContent(content) {
    const sections = {};
    const lines = content.trim().split('\n');
    let currentSection = null;
    let currentContent = [];

    for (const line of lines) {
      if (line.startsWith('## ')) {
        // Save previous section
        if (currentSection) {
          sections[currentSection] = currentContent.join('\n').trim();
        }
        // Start new section
        currentSection = line.substring(3).trim().toLowerCase();
        currentContent = [];
      } else if (currentSection) {
        currentContent.push(line);
      }
    }

    // Save last section
    if (currentSection) {
      sections[currentSection] = currentContent.join('\n').trim();
    }

    return sections;
  }

  // Parse ingredients list
  parseIngredients(ingredientsText) {
    if (!ingredientsText) return [];
    return ingredientsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-'))
      .map(line => line.substring(1).trim());
  }

  // Parse instructions with step format
  parseInstructions(instructionsText) {
    if (!instructionsText) return [];
    return instructionsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('Step '))
      .map(line => {
        const match = line.match(/^Step \d+ - ([^:]+): (.+)$/);
        if (match) {
          return {
            stepName: match[1].trim(),
            description: match[2].trim()
          };
        }
        return {
          stepName: 'Step',
          description: line
        };
      });
  }

  // Convert markdown file to recipe object
  parseMarkdownFile(content) {
    try {
      const { frontmatter, content: markdownContent } = this.parseFrontmatter(content);
      const sections = this.parseContent(markdownContent);

      const recipe = {
        name: frontmatter.title || 'Untitled Recipe',
        description: frontmatter.description || '',
        timePortion: frontmatter.timePortion || '',
        image: frontmatter.image || '',
        modalImage: frontmatter.modalImage || '',
        categories: frontmatter.categories || [],
        youtubeUrl: frontmatter.youtubeUrl || '',
        theme: frontmatter.theme || '',
        ingredients: this.parseIngredients(sections.ingredients),
        instructions: this.parseInstructions(sections.instructions)
      };

      return recipe;
    } catch (error) {
      console.error('Error parsing markdown file:', error);
      throw error;
    }
  }

  // Get all recipe files for a theme
  async getRecipeFiles(themeName) {
    // Map theme names to folder names
    const themeNameToFolder = {
      'Cafe in Seoul': 'korean-cafe',
      'Grandmother\'s House': 'korean-grandmother\'s-house'
    };
    
    const themeFolder = themeNameToFolder[themeName] || themeName.toLowerCase().replace(/\s+/g, '-');
    
    try {
      // Since we can't directly read directory contents in browser,
      // we'll maintain a manifest of available recipes
      const manifest = await this.getRecipeManifest();
      return manifest[themeFolder] || [];
    } catch (error) {
      console.error(`Error getting recipe files for theme ${themeName}:`, error);
      return [];
    }
  }

  // Recipe manifest - maps theme folders to their recipe files
  // In a real implementation, this could be generated build-time or managed dynamically
  async getRecipeManifest() {
    return {
      'korean-netflix-night': [
        'buldak-rabokki.md',
        'eggplant-chip.md',
        'korean-fried-chicken.md',
        'mandu.md',
        'tteokbokki.md'
      ],
      'korean-bbq-restaurant': [
        'andong-jjimdak.md',
        'buckwheat-noodles-with-perilla-oil.md',
        'doenjang-stew.md',
        'kimchi-stew.md',
        'kimchi.md',
        'korean-bbq.md'
      ],
      'korean-cafe': [
        'ice-strawberry-latte.md',
        'lemon-pound-cake.md',
        'matcha-latte.md',
        'strawberry-chap-sal-tteok.md',
        'strawberry-sandwich.md'
      ],
      'korean-dining-room': [
        'bulgogi.md',
        'grilled-mackerel.md',
        'japchae.md',
        'kimchi-stew.md',
        'kimchi.md',
        'soybean-sprout-soup.md'
      ],
      'korean-grandmother\'s-house': [
        'korean-marinated-eggs.md',
        'sam-gye-tang.md',
        'scorched-rice.md',
        'spicy-tofu-stew.md',
        'stir-fried-anchovies.md',
        'tofu-jorim.md'
      ],
      'han-river': [
        'gimbap.md',
        'lemon-cheong-soda.md',
        'potato-salada-sandwich.md',
        'salad-jar.md',
        'samgak-gimbap.md',
        'strawberry-sandwich.md'
      ],
      'namdaemun-market': [
        'gimari.md',
        'hotteok.md',
        'korean-street-toast.md',
        'mandu.md',
        'tteokbokki.md',
        'twigim.md'
      ],
      'pocha-night': [
        'bibimbap.md',
        'bulgogi.md',
        'japchae.md',
        'korean-fried-chicken.md',
        'tteokbokki.md'
      ]
    };
  }

  // Fetch and parse a single recipe file
  async getRecipe(themeName, recipeFileName) {
    // Map theme names to folder names
    const themeNameToFolder = {
      'Cafe in Seoul': 'korean-cafe',
      'Grandmother\'s House': 'korean-grandmother\'s-house'
    };
    
    const themeFolder = themeNameToFolder[themeName] || themeName.toLowerCase().replace(/\s+/g, '-');
    const cacheKey = `${themeFolder}/${recipeFileName}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const { data, timestamp } = this.cache.get(cacheKey);
      if (Date.now() - timestamp < this.cacheExpiry) {
        return data;
      }
    }

    try {
      const filePath = `/recipes/${themeFolder}/${recipeFileName}`;
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch recipe: ${response.status}`);
      }

      const content = await response.text();
      const recipe = this.parseMarkdownFile(content);

      // Cache the result
      this.cache.set(cacheKey, {
        data: recipe,
        timestamp: Date.now()
      });

      return recipe;
    } catch (error) {
      console.error(`Error fetching recipe ${cacheKey}:`, error);
      throw error;
    }
  }

  // Get all recipes for a theme
  async getRecipesForTheme(themeName) {
    try {
      const recipeFiles = await this.getRecipeFiles(themeName);
      const recipes = await Promise.all(
        recipeFiles.map(fileName => this.getRecipe(themeName, fileName))
      );
      return recipes.filter(recipe => recipe !== null);
    } catch (error) {
      console.error(`Error getting recipes for theme ${themeName}:`, error);
      return [];
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Force refresh - clear cache and fetch fresh data
  async refreshRecipes(themeName) {
    // Clear relevant cache entries
    const themeFolder = themeName.toLowerCase().replace(/\s+/g, '-');
    for (const key of this.cache.keys()) {
      if (key.startsWith(themeFolder)) {
        this.cache.delete(key);
      }
    }
    
    return this.getRecipesForTheme(themeName);
  }
}

export default new MarkdownService();