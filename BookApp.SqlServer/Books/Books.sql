CREATE TABLE [dbo].[Books]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1, 1),
	Title NVarChar(255) Not Null,
	Description NVarChar(Max) Null,
)
Go

