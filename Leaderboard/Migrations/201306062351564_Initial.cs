namespace Leaderboard.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Athlete",
                c => new
                    {
                        AthleteId = c.Int(nullable: false, identity: true),
                        CompetitionId = c.Int(nullable: false),
                        ProfileId = c.Int(),
                        DivisionId = c.Int(),
                        Name = c.String(maxLength: 4000),
                        Gender = c.Byte(nullable: false),
                    })
                .PrimaryKey(t => t.AthleteId)
                .ForeignKey("dbo.Division", t => t.DivisionId)
                .ForeignKey("dbo.Competition", t => t.CompetitionId)
                .ForeignKey("dbo.Profile", t => t.ProfileId)
                .Index(t => t.DivisionId)
                .Index(t => t.CompetitionId)
                .Index(t => t.ProfileId);
            
            CreateTable(
                "dbo.Competition",
                c => new
                    {
                        CompetitionId = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 4000),
                    })
                .PrimaryKey(t => t.CompetitionId);
            
            CreateTable(
                "dbo.Division",
                c => new
                    {
                        DivisionId = c.Int(nullable: false, identity: true),
                        CompetitionId = c.Int(nullable: false),
                        Name = c.String(maxLength: 4000),
                    })
                .PrimaryKey(t => t.DivisionId)
                .ForeignKey("dbo.Competition", t => t.CompetitionId)
                .Index(t => t.CompetitionId);
            
            CreateTable(
                "dbo.Workout",
                c => new
                    {
                        WorkoutId = c.Int(nullable: false, identity: true),
                        Name = c.Int(nullable: false),
                        WorkoutTypeId = c.Int(nullable: false),
                        CompetitionId = c.Int(nullable: false),
                        DivisionId = c.Int(),
                        Date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.WorkoutId)
                .ForeignKey("dbo.WorkoutType", t => t.WorkoutTypeId)
                .ForeignKey("dbo.Competition", t => t.CompetitionId)
                .ForeignKey("dbo.Division", t => t.DivisionId)
                .Index(t => t.WorkoutTypeId)
                .Index(t => t.CompetitionId)
                .Index(t => t.DivisionId);
            
            CreateTable(
                "dbo.WorkoutType",
                c => new
                    {
                        WorkoutTypeId = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 4000),
                    })
                .PrimaryKey(t => t.WorkoutTypeId);
            
            CreateTable(
                "dbo.Score",
                c => new
                    {
                        ScoreId = c.Int(nullable: false, identity: true),
                        AthleteId = c.Int(nullable: false),
                        WorkoutId = c.Int(nullable: false),
                        Value = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ScoreId)
                .ForeignKey("dbo.Athlete", t => t.AthleteId)
                .ForeignKey("dbo.Workout", t => t.WorkoutId)
                .Index(t => t.AthleteId)
                .Index(t => t.WorkoutId);
            
            CreateTable(
                "dbo.Profile",
                c => new
                    {
                        ProfileId = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 4000),
                    })
                .PrimaryKey(t => t.ProfileId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Score", new[] { "WorkoutId" });
            DropIndex("dbo.Score", new[] { "AthleteId" });
            DropIndex("dbo.Workout", new[] { "DivisionId" });
            DropIndex("dbo.Workout", new[] { "CompetitionId" });
            DropIndex("dbo.Workout", new[] { "WorkoutTypeId" });
            DropIndex("dbo.Division", new[] { "CompetitionId" });
            DropIndex("dbo.Athlete", new[] { "ProfileId" });
            DropIndex("dbo.Athlete", new[] { "CompetitionId" });
            DropIndex("dbo.Athlete", new[] { "DivisionId" });
            DropForeignKey("dbo.Score", "WorkoutId", "dbo.Workout");
            DropForeignKey("dbo.Score", "AthleteId", "dbo.Athlete");
            DropForeignKey("dbo.Workout", "DivisionId", "dbo.Division");
            DropForeignKey("dbo.Workout", "CompetitionId", "dbo.Competition");
            DropForeignKey("dbo.Workout", "WorkoutTypeId", "dbo.WorkoutType");
            DropForeignKey("dbo.Division", "CompetitionId", "dbo.Competition");
            DropForeignKey("dbo.Athlete", "ProfileId", "dbo.Profile");
            DropForeignKey("dbo.Athlete", "CompetitionId", "dbo.Competition");
            DropForeignKey("dbo.Athlete", "DivisionId", "dbo.Division");
            DropTable("dbo.Profile");
            DropTable("dbo.Score");
            DropTable("dbo.WorkoutType");
            DropTable("dbo.Workout");
            DropTable("dbo.Division");
            DropTable("dbo.Competition");
            DropTable("dbo.Athlete");
        }
    }
}
