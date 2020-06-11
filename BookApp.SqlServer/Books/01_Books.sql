CREATE TABLE [dbo].[Books]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1, 1),
	Title NVarChar(255) Not Null,
	Description NVarChar(Max) Null,

	[Created]       DateTime Default(GetDate()) Null,  		    -- 생성일(PostDate), DatePublished, CreatedAt
)
Go
