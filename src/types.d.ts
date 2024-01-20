export type Asset = {
  Id: number;
  GameId: number;
  Name: string;
};

export type CategorySection = {
  ExtraIncludePattern: string;
  GameID: number;
  ID: number;
  InitialInclusionPattern: string;
  Name: string;
  PackageType: number;
  Path: string;
};

export type FileParsingRule = {
  CommentStripPattern: string;
  FileExtension: string;
  InclusionPattern: string;
};

export type GameDetectionHint = {
  ID: number;
  HintType: number;
  HintPath: string;
  HintKey: string;
  HintOptions: number;
};

export type GameFile = {
  FileName: string;
  FileType: number;
  GameId: number;
  Id: number;
  IsRequired: boolean;
  PlatformType: number;
};

export type Game = {
  AddOnSettingsFileFilter: string;
  AddOnSettingsFileRemovalFilter: string;
  AddOnSettingsFolderFilter: string;
  AddOnSettingsStartingFolder: string;
  Assets: Asset[];
  BundleAssets: boolean;
  CategorySections: CategorySection[];
  DateModified: string;
  FileParsingRules: FileParsingRule[];
  GameDetectionHints: GameDetectionHint[];
  GameFiles: GameFile[];
  ID: number;
  MaxFileSize: number;
  MaxFreeStorage: number;
  MaxPremiumStorage: number;
  Name: string;
  Order: number;
  ProfilerAddOnId: number;
  Slug: string;
  SupportsAddons: boolean;
  SupportsNotifications: boolean;
  SupportsVoice: boolean;
  TwitchGameId: number;
};
